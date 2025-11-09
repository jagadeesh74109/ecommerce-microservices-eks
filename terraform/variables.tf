variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "ecommerce-eks"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "ecom_admin"
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
  # No default value - will be provided via environment variable or command line
}
