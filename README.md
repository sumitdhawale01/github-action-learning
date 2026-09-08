# Deploying `app/` to EKS (manual steps — GitHub Actions comes later)

## Structure
```
terraform/
├── modules/
│   ├── ecr/    → ECR repository
│   ├── vpc/    → VPC, public/private subnets, IGW, NAT gateway
│   └── eks/    → EKS cluster, IAM roles, OIDC provider (IRSA), node group
├── main.tf     → wires the three modules together + installs ALB controller
├── providers.tf
├── variables.tf
└── outputs.tf

kubernetes/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
└── ingress.yaml
```

All modules are native Terraform resources — no external registry module dependency.

## Reconcile before you run this
Check `app/server.js` for the actual port it listens on — I assumed `3000` in
`kubernetes/deployment.yaml` and `kubernetes/service.yaml`. Update both if it differs.

## 1. Provision the infrastructure
```bash
cd terraform
terraform init
terraform plan
terraform apply
```
Takes ~12–15 minutes (EKS control plane creation is the slow part).

## 2. Point kubectl at the new cluster
```bash
aws eks update-kubeconfig --region ap-south-1 --name github-action-eks-cluster
kubectl get nodes
```

## 3. Build and push your Docker image to ECR
```bash
ECR_URL=$(terraform -chdir=terraform output -raw ecr_repository_url)
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ECR_URL

cd ../app
docker build -t $ECR_URL:latest .
docker push $ECR_URL:latest
```

## 4. Update the image reference and deploy
Edit `kubernetes/deployment.yaml`, replace the `image:` line with your real
`$ECR_URL:latest`, then:
```bash
cd ../kubernetes
kubectl apply -f namespace.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

## 5. Get your app's public URL
```bash
kubectl get ingress -n eks-app
```
Takes 2–3 minutes for the ALB to provision. The `ADDRESS` column shows the public
ALB DNS name once ready.

## 6. Verify everything
```bash
kubectl get pods -n eks-app
kubectl get svc -n eks-app
kubectl describe ingress eks-app-ingress -n eks-app
```

## Next step
Once you've confirmed the manual deploy works end-to-end, we build
`.github/workflows/deploy.yml` to automate steps 3–4 (test → build → push → apply)
on every push to `main`.

## Cost note
Real billable resources: EKS control plane (~$0.10/hr), 2x t3.medium nodes, 1 NAT
gateway, 1 ALB. Run `terraform destroy` when done testing.
