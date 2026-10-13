resource "google_service_account" "app" {
  for_each = local.apps

  project      = var.project_id
  account_id   = "${local.prefix}-${each.key}"
  display_name = "Cloud Run runtime · ${each.key} (${var.environment})"
}

resource "google_service_account" "migrator" {
  project      = var.project_id
  account_id   = "${local.prefix}-migrator"
  display_name = "Cloud Run job · prisma migrate deploy (${var.environment})"
}

resource "google_service_account" "deployer" {
  project      = var.project_id
  account_id   = "${local.prefix}-deployer"
  display_name = "Cloud Build deployer (${var.environment})"
}

locals {
  database_clients = merge(
    { for app, account in google_service_account.app : app => account.email },
    { migrator = google_service_account.migrator.email },
  )
}

resource "google_project_iam_member" "database_client" {
  for_each = local.database_clients

  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${each.value}"
}

resource "google_project_iam_member" "deployer" {
  for_each = toset([
    "roles/run.admin",
    "roles/artifactregistry.writer",
    "roles/logging.logWriter",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

# The deployer may deploy revisions that run as the runtime service accounts — and nothing else.
resource "google_service_account_iam_member" "deployer_acts_as" {
  for_each = merge(
    { for app, account in google_service_account.app : app => account.name },
    { migrator = google_service_account.migrator.name },
  )

  service_account_id = each.value
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.deployer.email}"
}
