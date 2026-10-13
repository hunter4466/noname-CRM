locals {
  prefix = "noname-${var.environment}"

  # Everything that differs between environments lives here. Staging and prod share the
  # "production" profile, so the only differences between them are the project and its data.
  profiles = {
    development = {
      run_min_instances   = 0
      run_max_instances   = 2
      run_cpu             = "1"
      run_memory          = "512Mi"
      run_cpu_idle        = true
      sql_tier            = "db-f1-micro"
      sql_availability    = "ZONAL"
      sql_disk_size_gb    = 10
      sql_backups         = false
      sql_pitr            = false
      deletion_protection = false
      log_retention_days  = 7
    }
    production = {
      run_min_instances   = 1
      run_max_instances   = 10
      run_cpu             = "1"
      run_memory          = "1Gi"
      run_cpu_idle        = true
      sql_tier            = "db-custom-1-3840"
      sql_availability    = "REGIONAL"
      sql_disk_size_gb    = 20
      sql_backups         = true
      sql_pitr            = true
      deletion_protection = true
      log_retention_days  = 30
    }
  }

  sizing = local.profiles[var.profile]

  apps = toset(["crm", "pos"])

  # Cloud Run v2 URLs are deterministic, which lets each app link to the other without a dependency cycle.
  service_urls = {
    for app in local.apps : app => "https://${local.prefix}-${app}-${data.google_project.this.number}.${var.region}.run.app"
  }

  registry_path = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.apps.repository_id}"

  # Placeholder so `terraform apply` can create services before the first pipeline run.
  # Images are owned by the pipeline afterwards (see lifecycle.ignore_changes).
  bootstrap_image = "us-docker.pkg.dev/cloudrun/container/hello"
}

data "google_project" "this" {
  project_id = var.project_id
}
