module "vpc" {
  source                  = "terraform-aws-modules/vpc/aws"
  name                    = var.vpc_name
  version                 = "~> 6.6"
  cidr                    = var.vpc_cidr
  azs                     = data.aws_availability_zones.azs.names
  private_subnets         = var.private_subnets
  public_subnets          = var.public_subnets
  map_public_ip_on_launch = true
  enable_dns_hostnames    = true

  tags = {
    Name        = var.vpc_name
    Terraform   = "true"
    Environment = "dev"
  }
  public_subnet_tags = {
    Name = "jenkins-subnet"
  }
}
module "sg" {
  source      = "terraform-aws-modules/security-group/aws"
  name        = var.jenkins_security_group
  description = "security group for jenkins server"
  vpc_id      = module.vpc.vpc_id
  version     = "~> 5.3"
  ingress_with_cidr_blocks = [
    {
      from_port   = 8080
      to_port     = 8080
      protocol    = "tcp"
      description = "allow jenkins access"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      description = "allow ssh"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      description = "http access"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      description = "https access"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = "0.0.0.0/0"
    }
  ]

  tags = {
    Name = "jenkins-sg"
  }
}

module "ec2" {
  source = "terraform-aws-modules/ec2-instance/aws"
  name   = var.jenkins_instance_name

  instance_type               = var.instance_type
  ami                         = data.aws_ami.ubuntu.id
  key_name                    = "Jenkins_srv"
  monitoring                  = true
  vpc_security_group_ids      = [module.sg.security_group_id]
  subnet_id                   = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  user_data                   = file("./script.sh")
  availability_zone           = data.aws_availability_zones.azs.names[0]
  tags = {
    Name        = "Jenkins-Server"
    Terraform   = "true"
    Environment = "dev"
  }
}