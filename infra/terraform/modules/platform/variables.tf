variable "project_id" {
  description = "GCP project that hosts this environment (one project per environment)."
  type        = string
}

variable "region" {
  description = "Region for every regional resource."
  type        = string
  default     = "southamerica-west1"
}

variable "environment" {
  description = "Environment name: dev, staging or prod."
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging or prod."
  }
}

variable "profile" {
  description = "Sizing profile. Staging and prod MUST both use \"production\" so they stay identical; dev uses \"development\"."
  type        = string

  validation {
    condition     = contains(["development", "production"], var.profile)
    error_message = "profile must be development or production."
  }
}

variable "images_to_keep" {
  description = "Most recent image versions kept per package in Artifact Registry; older ones are deleted automatically."
  type        = number
  default     = 5
}

variable "image_max_age_days" {
  description = "Tagged images older than this are deleted unless they are among the most recent images_to_keep."
  type        = number
  default     = 14
}
