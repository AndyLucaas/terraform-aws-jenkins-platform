terraform {
  backend "s3" {
    bucket = "bucket-terraform-9386"
    key    = "jenkins/terraform.tfstate"
    region = "eu-north-1"
  }
}