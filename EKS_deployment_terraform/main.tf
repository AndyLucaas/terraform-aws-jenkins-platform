module "vpc" {
  source               = "terraform-aws-modules/vpc/aws"
  name                 = var.vpc_name
  cidr                 = var.vpc_cidr
  azs                  = var.availability_zones
  private_subnets      = var.private_subnets
  public_subnets       = var.public_subnets
  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    Terraform                              = "true"
    Environment                            = "prod"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/internal-elb"      = 1
  }
}

module "eks_sg" {
  source      = "terraform-aws-modules/security-group/aws"
  name        = "security-group-cluster"
  description = "security group for EKS cluster"
  vpc_id      = module.vpc.vpc_id
  version     = "~> 5.3"
  ingress_with_cidr_blocks = [
    {
      from_port   = 3000
      to_port     = 32767
      protocol    = "tcp"
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
    Terraform   = "true"
    Environment = "prod"
  }
}
module "load_balancer_sg" {
  source      = "terraform-aws-modules/security-group/aws"
  name        = "security-group-load-balancer"
  description = "security group for load balancer"
  vpc_id      = module.vpc.vpc_id
  version     = "~> 5.3"
  ingress_with_cidr_blocks = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 8080
      to_port     = 8080
      protocol    = "tcp"
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
    Terraform   = "true"
    Environment = "prod"
  }
}

module "load_balancer" {
  source             = "terraform-aws-modules/alb/aws"
  name               = "load-balancer"
  load_balancer_type = "application"
  subnets            = module.vpc.public_subnets
  security_groups    = module.load_balancer_sg.security_group_id

  tags = {
    Environment = "prod"
    Terraform   = "true"
  }
}

module "eks" {
  source             = "terraform-aws-modules/eks/aws"
  version            = "~> 21.0"
  name               = "cluster-prod"
  kubernetes_version = "1.33"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    nodes = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      instance_types = ["t2.small"]
      capacity_type  = "SPOT"
    }
  }

  tags = {
    Environment = "prod"
    Terraform   = "true"
  }
}