# Soul Menu Management
Manages restaurant menu for drinks and food

# Project structure
- ansible: deployment configuration
- server: backend service
- client: client application

# Deployment

## Prerequisites
- run `ansible-galaxy collection install community.docker`
- run `ansible-galaxy collection install amazon.aws`
- prepare yaml file with properties under ./ansible/main/vars/main.yaml. 

Required properties:
```yaml
---
app_name:
app_env:

aws_profile:
region_name:
aws_access_key:
aws_secret_key:

app_security_secret:
db_uri:
db_name:
spring_profile:

init_user_email_list:
init_user_login_list:
init_user_role_list: 
init_user_password_list: 

server_image: 
client_image: 

server_base_url:

server_port_from:
server_port_to:
client_port_from:
client_port_to:
```
## Infrastructure set up
- run `ansible-playbook ./ansible/main/local-deploy-all.yaml -i ./ansible/main/inventory/local`
- copy public DNS name of EC2 instance and add to ./ansible/main/vars/main.yaml file as
`server_base_url: 'YOUR PUBLIC DNS NAME'`
- run `gradlew build` to build server artifact (jar file)
- run `ansible-playbook ./ansible/main/local-build-server.yaml -i ./ansible/main/inventory/local` to build server docker image and push to docker hub
- run `ansible-playbook ./ansible/main/local-build-client.yaml -i ./ansible/main/inventory/local` to build client docker image and push to docker hub
- run `ansible-playbook ./ansible/main/remote.yaml -i ./ansible/main/inventory/remote` to deploy server and client images in docker containers

## Clean up resources
- run `ansible-playbook ./ansible/main/clean-up.yaml -i ./ansible/main/inventory/local`, it will terminate EC2 instance

# Additional resources
- [create ec2 instances on AWS using Ansible](https://davelms.medium.com/use-ansible-to-create-and-configure-ec2-instances-on-aws-cfbb0ed019bf)
- [create ec2 instances on AWS using Ansible github example](https://github.com/davelms/medium-articles/blob/master/ansible-aws/inventory/local)

# Deploy instructions (TBD)

- create CD distribution
- http only
- add certificate
- add custom header Authorization
- Attach ec2 public DNS