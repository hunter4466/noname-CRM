output "service_urls" {
  description = "Public URL of each app."
  value       = local.service_urls
}

output "registry_path" {
  description = "Artifact Registry path images are pushed to."
  value       = local.registry_path
}

output "deployer_service_account" {
  description = "Service account Cloud Build triggers should run as."
  value       = google_service_account.deployer.email
}

output "sql_connection_name" {
  description = "Cloud SQL instance connection name."
  value       = google_sql_database_instance.main.connection_name
}

output "migrate_job_name" {
  description = "Cloud Run job that runs prisma migrate deploy."
  value       = google_cloud_run_v2_job.migrate.name
}
