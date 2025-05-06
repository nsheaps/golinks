# Architecture Overview

This document provides an overview of the Golinks architecture and its components.

## System Components

### Frontend (Web)

- React-based single-page application
- Built with TypeScript
- Uses SWC for compilation
- Implements authentication flows
- Provides admin dashboard
- Shows usage metrics

### Backend (API)

- Node.js/TypeScript application
- RESTful API
- Implements authentication
- Manages redirects
- Tracks usage metrics
- Supports multiple storage backends

### Storage Backends

1. **JSON Storage**

   - Static configuration
   - Updated via deployment
   - No metrics support

2. **SQLite**

   - Local development
   - Single-file database
   - Full metrics support

3. **PostgreSQL/MySQL/MariaDB**
   - Production-ready
   - Scalable
   - Full metrics support

## Authentication Flow

1. **Local Authentication**

   - Username/password
   - JWT-based sessions
   - Role-based access control

2. **Google OAuth**
   - OAuth 2.0 flow
   - Domain/email whitelist
   - JWT-based sessions
   - Role-based access control

## Privacy Controls

1. **Public Links**

   - Searchable
   - Accessible to all
   - Usage metrics visible to admins

2. **Unlisted Links**

   - Not searchable
   - Accessible via direct URL
   - Usage metrics visible to admins

3. **Private Links**
   - Not searchable
   - Requires authentication
   - Usage metrics visible to owner and admins

## Deployment Architecture

### Local Development

- Tilt for local development
- Local Kubernetes cluster
- SQLite for storage
- Hot-reloading

### Production

- Kubernetes deployment
- EKS cluster
- PostgreSQL/MySQL/MariaDB
- IAM role-based authentication
- GitHub Actions CI/CD

### GitHub Pages

- Static site deployment
- API proxying
- Limited functionality

## Data Flow

1. **Link Creation**

   ```
   User -> Web UI -> API -> Storage
   ```

2. **Link Access**

   ```
   User -> Web UI -> API -> Storage -> Redirect
   ```

3. **Metrics Collection**
   ```
   User -> Web UI -> API -> Storage -> Metrics
   ```

## Security Considerations

1. **Authentication**

   - JWT-based sessions
   - Secure password hashing
   - OAuth 2.0 implementation

2. **Authorization**

   - Role-based access control
   - Link ownership
   - Admin privileges

3. **Data Protection**
   - Encrypted storage
   - Secure connections
   - Input validation

## Monitoring and Metrics

1. **Usage Metrics**

   - Link access counts
   - User tracking
   - Time-based analytics

2. **System Metrics**
   - Performance monitoring
   - Error tracking
   - Resource utilization

## Future Considerations

1. **Scalability**

   - Horizontal scaling
   - Caching strategies
   - Load balancing

2. **Features**

   - Custom domains
   - API rate limiting
   - Advanced analytics

3. **Integration**
   - Additional OAuth providers
   - Webhook support
   - API integrations
