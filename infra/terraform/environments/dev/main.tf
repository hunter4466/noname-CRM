# dev environment. Not applied yet — see infra/README.md before running Terraform.
module "platform" {
  source = "../../modules/platform"

  project_id  = var.project_id
  region      = var.region
  environment = "dev"
  profile     = "development"
}
