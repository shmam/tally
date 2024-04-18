docker_build('tcp', '.', dockerfile='Dockerfile.tcp')
# docker_build('tcp-clustering', '.', dockerfile='Dockerfile.tcpclustering')
# docker_build('udp', '.', dockerfile='Dockerfile.udp')

k8s_yaml('kubernetes/tcp-server-deployment.yaml')
# k8s_yaml('kubernetes/tcp-server-clustering-deployment.yaml')
# k8s_yaml('kubernetes/udp-server-deployment.yaml')

k8s_resource('tcp-server', port_forwards=5555)
# k8s_resource('tcp-server-clustering', port_forwards=5556)
# k8s_resource('udp-server', port_forwards=5557)