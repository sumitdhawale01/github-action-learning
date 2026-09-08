variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-south-1"
}

variable "app_name" {
  description = "Prefix used for naming resources (VPC, ECR repo, etc.)"
  type        = string
  default     = "github-action-eks-app"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "github-action-eks-cluster"
}

variable "cluster_version" {
  description = "Kubernetes version for EKS"
  type        = string
  default     = "1.36"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "azs" {
  type    = list(string)
  default = ["ap-south-1a", "ap-south-1b"]
}

variable "private_subnets" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "public_subnets" {
  type    = list(string)
  default = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.small"]
}

variable "node_desired_size" {
  type    = number
  default = 2
}

variable "node_min_size" {
  type    = number
  default = 1
}

variable "node_max_size" {
  type    = number
  default = 3
}

variable "ecr_repository_name" {
  type    = string
  default = "github-action-eks-app"
}
