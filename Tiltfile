# Load the Tilt extensions
load('ext://react_router', 'react_router')
load('ext://local_resource', 'local_resource')

# Configure the local Kubernetes cluster
k8s_custom_deploy(
    'golinks',
    apply_cmd='kubectl apply -f k8s/local',
    delete_cmd='kubectl delete -f k8s/local',
    deps=['k8s/local'],
)

# Define the development environment
local_resource(
    'dev',
    cmd='yarn dev',
    deps=['package.json', 'yarn.lock'],
    trigger_mode='auto',
)

# Configure the web application
react_router(
    'web',
    entry_point='apps/web/src/main.tsx',
    port=3000,
    deps=['apps/web'],
)

# Configure the API
local_resource(
    'api',
    cmd='yarn workspace @golinks/api dev',
    deps=['apps/api'],
    trigger_mode='auto',
) 