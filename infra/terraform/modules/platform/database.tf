resource "random_password" "database" {
  length  = 32
  special = false
}

resource "google_sql_database_instance" "main" {
  project             = var.project_id
  name                = "${local.prefix}-postgres"
  region              = var.region
  database_version    = "POSTGRES_17"
  deletion_protection = local.sizing.deletion_protection

  settings {
    tier              = local.sizing.sql_tier
    edition           = "ENTERPRISE"
    availability_type = local.sizing.sql_availability
    disk_size         = local.sizing.sql_disk_size_gb
    disk_autoresize   = true

    # Public IP with no authorized networks: only the Cloud SQL connector (IAM-checked) can reach it.
    ip_configuration {
      ipv4_enabled = true
      ssl_mode     = "ENCRYPTED_ONLY"
    }

    backup_configuration {
      enabled                        = local.sizing.sql_backups
      point_in_time_recovery_enabled = local.sizing.sql_pitr
      start_time                     = "07:00" # 02:00 Lima
    }

    maintenance_window {
      day  = 7
      hour = 8 # Sunday 03:00 Lima
    }

    insights_config {
      query_insights_enabled = true
    }
  }

  depends_on = [google_project_service.this]
}

resource "google_sql_database" "app" {
  project  = var.project_id
  instance = google_sql_database_instance.main.name
  name     = "noname_crm"
}

resource "google_sql_user" "app" {
  project  = var.project_id
  instance = google_sql_database_instance.main.name
  name     = "noname_app"
  password = random_password.database.result
}
