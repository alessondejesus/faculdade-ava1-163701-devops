# faculdade-ava1-163701-devops

## Executando com Docker

```bash
docker build -t faculdade-ava1-api .
docker run -p 3000:3000 faculdade-ava1-api
```

A API fica disponível em http://localhost:3000/products.

## Infraestrutura

Detalhes em [docs/infraestrutura.md](docs/infraestrutura.md).

### 1. Ansible (gera a imagem)

```bash
ansible-playbook infrastructure/ansible/playbook.yml
```

O Ansible só gera a imagem, não sobe servidor.

### 2. Terraform (sobe o container)

```bash
cd infrastructure/terraform
terraform init
terraform apply
```

Acesse http://localhost:3000/products.

Para remover o container: `terraform destroy`.

### 3. Kubernetes

```bash
kubectl apply -f infrastructure/kubernetes/
kubectl scale deployment api --replicas=3
kubectl get pods
```

Acesse http://localhost:30080/products.
