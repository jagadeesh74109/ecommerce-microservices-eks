terraform {
  backend "s3" {
    bucket         = "ecommerce-terraform-state-888577034276"
    key            = "eks/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
