resource "google_cloud_run_v2_service" "app" {
  for_each = local.apps

  project             = var.project_id
  name                = "${local.prefix}-${each.key}"
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = local.sizing.deletion_protection

  template {
    service_account = google_service_account.app[each.key].email

    scaling {
      min_instance_count = local.sizing.run_min_instances
      max_instance_count = local.sizing.run_max_instances
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name]
      }
    }

    containers {
      image = local.bootstrap_image

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = local.sizing.run_cpu
          memory = local.sizing.run_memory
        }
        cpu_idle          = local.sizing.run_cpu_idle
        startup_cpu_boost = true
      }

      env {
        name  = "APP_ENV"
        value = var.environment
      }
      env {
        name  = "CRM_URL"
        value = local.service_urls["crm"]
      }
      env {
        name  = "POS_URL"
        value = local.service_urls["pos"]
      }
      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.database_url.secret_id
            version = "latest"
          }
        }
      }

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      startup_probe {
        http_get {
          path = "/api/health"
        }
        initial_delay_seconds = 2
        period_seconds        = 5
        failure_threshold     = 6
      }

      liveness_probe {
        http_get {
          path = "/api/health"
        }
        period_seconds = 30
      }
    }
  }

  # Always serve the newest revision; old revisions are pruned by the pipeline.
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  lifecycle {
    # The pipeline deploys new images; Terraform owns everything else.
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
    ]
  }

  depends_on = [
    google_project_service.this,
    google_secret_manager_secret_iam_member.database_url,
    google_project_iam_member.database_client,
  ]
}

# Both apps are public web apps; authentication is handled inside the apps.
resource "google_cloud_run_v2_service_iam_member" "public" {
  for_each = local.apps

  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.app[each.key].name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_v2_job" "migrate" {
  project             = var.project_id
  name                = "${local.prefix}-migrate"
  location            = var.region
  deletion_protection = local.sizing.deletion_protection

  template {
    task_count = 1

    template {
      service_account = google_service_account.migrator.email
      max_retries     = 0
      timeout         = "600s"

      volumes {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [google_sql_database_instance.main.connection_name]
        }
      }

      containers {
        image = local.bootstrap_image

        env {
          name = "DATABASE_URL"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.database_url.secret_id
              version = "latest"
            }
          }
        }

        volume_mounts {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].template[0].containers[0].image,
      client,
      client_version,
    ]
  }

  depends_on = [
    google_project_service.this,
    google_secret_manager_secret_iam_member.database_url,
  ]
}
