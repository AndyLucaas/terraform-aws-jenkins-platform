variable "vpc_name" {
    type = string
}
variable "vpc_cidr" {
    type = string
}
variable "private_subnets" {
  type = list(string)
}
variable "public_subnets" {
  type = list(string)
}
variable "jenkins_security_group" {
    type = string
}
variable "instance_type" {
    type = string
}
variable "jenkins_instance_name" {
    type = string
}