variable "project_id" {
  description = "GCP project for this environment."
  type        = string
}

variable "region" {
  description = "GCP region."
  type        = string
  default     = "southamerica-west1"
}
