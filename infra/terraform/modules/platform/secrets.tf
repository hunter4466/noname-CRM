# DATABASE_URL for the apps and the migrator. Connects over the Cloud SQL unix socket mounted at /cloudsql.
# The password also lives in Terraform state — keep the state bucket private (see infra/README.md).
resource "google_secret_manager_secret" "database_url" {
  project   = var.project_id
  secret_id = "${local.prefix}-database-url"

  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }

  depends_on = [google_project_service.this]
}

resource "google_secret_manager_secret_version" "database_url" {
  secret = google_secret_manager_secret.database_url.id
  secret_data = format(
    "postgresql://%s:%s@localhost/%s?host=/cloudsql/%s&schema=public",
    google_sql_user.app.name,
    random_password.database.result,
    google_sql_database.app.name,
    google_sql_database_instance.main.connection_name,
  )
}

resource "google_secret_manager_secret_iam_member" "database_url" {
  for_each = local.database_clients

  project   = var.project_id
  secret_id = google_secret_manager_secret.database_url.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${each.value}"
}
