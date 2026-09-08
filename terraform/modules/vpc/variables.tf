variable "app_name" {
  type = string
}

variable "cluster_name" {
  description = "Used for the kubernetes.io/cluster/<name> subnet tags EKS/ALB controller need"
  type        = string
}

variable "vpc_cidr" {
  type = string
}

variable "azs" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "private_subnets" {
  type = list(string)
}
