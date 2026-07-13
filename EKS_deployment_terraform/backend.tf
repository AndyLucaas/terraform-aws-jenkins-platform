terraform {
  backend "s3" {
    bucket = "bucket-terraform-9386"
    key    = "eks/terraform.tfstate"
    region = "eu-north-1"
  }
}