docker_build('tcp', '.', 
    dockerfile='Dockerfile.tcp')
k8s_yaml('kubernetes/tcp-server-deployment.yaml')
k8s_resource('tcp-server', port_forwards=5555)