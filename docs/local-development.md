# Local Development Setup

This guide will help you set up the Golinks project for local development.

## Prerequisites

- Node.js 20.11.1 (managed via nvm)
- direnv
- Docker
- kubectl
- tilt
- A local Kubernetes cluster (e.g., minikube, kind)

## Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/golinks.git
   cd golinks
   ```

2. Install Node.js using nvm:

   ```bash
   nvm install
   ```

3. Allow direnv:

   ```bash
   direnv allow
   ```

4. Install dependencies:

   ```bash
   yarn install
   ```

5. Set up your local environment:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Local Kubernetes Setup

1. Start your local Kubernetes cluster:

   ```bash
   # For minikube
   minikube start

   # For kind
   kind create cluster
   ```

2. Create the required secrets:
   ```bash
   kubectl create secret generic golinks-secrets \
     --from-literal=database-url=postgresql://postgres:postgres@localhost:5432/golinks \
     --from-literal=jwt-secret=your-secret-here \
     --from-literal=google-client-id=your-client-id \
     --from-literal=google-client-secret=your-client-secret
   ```

## Starting Development

1. Start the development environment:

   ```bash
   tilt up
   ```

2. Access the application:
   - Web UI: http://localhost:3000
   - API: http://localhost:8080

## Development Workflow

1. Make changes to the code
2. Tilt will automatically rebuild and redeploy affected services
3. Test your changes
4. Run tests:
   ```bash
   yarn test
   ```
5. Check formatting and linting:
   ```bash
   yarn format
   yarn lint
   ```

## Troubleshooting

### Common Issues

1. **Tilt not detecting changes**

   - Ensure you're running the latest version of Tilt
   - Check that file watching is enabled in your OS

2. **Kubernetes connection issues**

   - Verify your cluster is running: `kubectl cluster-info`
   - Check that the secrets are properly created

3. **Database connection issues**
   - Ensure PostgreSQL is running
   - Verify the database URL in your secrets

### Getting Help

If you encounter issues not covered here:

1. Check the [Architecture Overview](./architecture.md)
2. Review the [API Documentation](./api.md)
3. Open an issue in the repository
