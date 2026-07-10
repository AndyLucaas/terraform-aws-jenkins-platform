terraform {
  backend "s3" {
    bucket = var.s3_bucket_name
    key    = "jenkins/terraform.tfstate"
    region = "eu-north-1"
  }
}