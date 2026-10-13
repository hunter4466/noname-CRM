# Container images for crm, pos and the migrator.
#
# Stale images are removed automatically so registry storage never grows release after release:
#   1. KEEP the `images_to_keep` most recent versions of each image (rollback window).
#   2. DELETE untagged digests after 1 day (layers left behind when a tag moves).
#   3. DELETE anything older than `image_max_age_days` that rule 1 does not keep.
# KEEP rules take precedence over DELETE rules. Cloud Run pins the digest it is serving, so
# deleting old images never breaks a running revision.
resource "google_artifact_registry_repository" "apps" {
  project       = var.project_id
  location      = var.region
  repository_id = "apps"
  description   = "Images for ${var.environment}: crm, pos, migrator"
  format        = "DOCKER"

  cleanup_policy_dry_run = false

  cleanup_policies {
    id     = "keep-recent-versions"
    action = "KEEP"
    most_recent_versions {
      keep_count = var.images_to_keep
    }
  }

  cleanup_policies {
    id     = "delete-untagged"
    action = "DELETE"
    condition {
      tag_state  = "UNTAGGED"
      older_than = "86400s"
    }
  }

  cleanup_policies {
    id     = "delete-old"
    action = "DELETE"
    condition {
      tag_state  = "ANY"
      older_than = "${var.image_max_age_days * 86400}s"
    }
  }

  depends_on = [google_project_service.this]
}
