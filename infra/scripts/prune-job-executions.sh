#!/usr/bin/env bash
# Keeps only the newest executions of the migrate job.
#   prune-job-executions.sh <job> <region> [keep]
set -euo pipefail

JOB="$1"
REGION="$2"
KEEP_EXECUTIONS="${3:-5}"

gcloud run jobs executions list --job "$JOB" --region "$REGION" --sort-by='~metadata.creationTimestamp' --format='value(metadata.name)' |
  tail -n +"$((KEEP_EXECUTIONS + 1))" |
  xargs -r -I{} gcloud run jobs executions delete {} --region "$REGION" --quiet
