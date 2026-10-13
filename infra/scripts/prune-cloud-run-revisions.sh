#!/usr/bin/env bash
# Deletes old Cloud Run revisions so every release does not leave another one behind.
# Keeps the revision currently serving traffic plus the newest KEEP_REVISIONS for quick rollback.
# Images are cleaned separately by the Artifact Registry cleanup policies (see Terraform).
#
#   prune-cloud-run-revisions.sh <service> <region> [keep]
set -euo pipefail

SERVICE="$1"
REGION="$2"
KEEP_REVISIONS="${3:-3}"

serving="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.traffic[].revisionName)' | tr ';' '\n')"

gcloud run revisions list --service "$SERVICE" --region "$REGION" --sort-by='~metadata.creationTimestamp' --format='value(metadata.name)' |
  tail -n +"$((KEEP_REVISIONS + 1))" |
  while read -r revision; do
    if grep -qx "$revision" <<<"$serving"; then
      continue
    fi
    echo "Deleting revision $revision"
    gcloud run revisions delete "$revision" --region "$REGION" --quiet
  done
