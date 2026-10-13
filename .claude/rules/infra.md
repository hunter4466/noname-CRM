# Infrastructure Rule

Applies to `infra/**` (Terraform, Dockerfiles, Cloud Build) and anything that affects deployment.

## Never apply without explicit approval

- Do not run `terraform apply`, `terraform destroy`, `terraform import`, `terraform state rm`, or any
  `gcloud` command that creates, changes or deletes cloud resources, unless the user explicitly asks for
  that specific action in the current conversation. `terraform fmt`, `validate` and
  `init -backend=false` are always fine; `plan` only when asked.
- Never trigger Cloud Build runs or deploys on your own.

## Environments

- Three environments, one GCP project each, region `southamerica-west1`: `dev`, `staging`, `prod`
  (`infra/terraform/environments/<env>`), all calling `infra/terraform/modules/platform`.
- **Staging and prod must stay identical.** Both use `profile = "production"`; their `main.tf` files
  differ only in the `environment` name. Any sizing/feature difference goes into the module's
  `profiles` map — never as an `if environment == "prod"` special case. Dev uses `profile = "development"`.
- Prod never builds images: `infra/cloudbuild/promote.yaml` copies the exact staging images (by commit
  SHA) into the prod registry. Images must therefore be environment-agnostic: no `NEXT_PUBLIC_*`
  values that differ per environment — runtime config goes through `getPublicConfig()` /
  `usePublicConfig()` and Cloud Run env vars.

## No stale images or revisions

Every release must clean up after itself:
- Artifact Registry cleanup policies (keep the newest `images_to_keep`, delete untagged after 1 day,
  delete older than `image_max_age_days`) — keep `cleanup_policy_dry_run = false`.
- Tag images with the commit SHA only; never add a moving `latest` tag.
- The pipelines' `prune` step deletes old Cloud Run revisions and migrate-job executions
  (`infra/scripts/`). Don't remove it when editing the pipelines.
- Run workloads on Cloud Run / Cloud Run jobs — no VMs that pull and keep images on local disk.
