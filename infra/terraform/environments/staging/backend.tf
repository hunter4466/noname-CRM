# Remote state lives in a private, versioned bucket inside this environment's own project.
# Create it once before the first `terraform init` (see infra/README.md).
terraform {
  backend "gcs" {
    bucket = "noname-crm-staging-tfstate"
    prefix = "platform"
  }
}
