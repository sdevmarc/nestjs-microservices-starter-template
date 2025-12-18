# NestJS Microservices Starter Template  
**API Gateway + Docker + Monorepo**

A **production-ready NestJS microservices starter** using an API Gateway pattern, TCP transport, and Docker-first development.

This repository is designed to be:
- Easy to run locally
- Correct in Docker networking
- Educational for learning microservices
- A solid base for real-world projects


## Features

- **Monorepo architecture** using NestJS
- **API Gateway pattern**
- **NestJS Microservices (TCP transport)**
- **Docker & Docker Compose ready**
- **Environment-based configuration**
- Independent deployable services
- Beginner-friendly and production-ready


### How it works
- Clients **never** talk to microservices directly
- API Gateway handles:
  - HTTP routes
  - Request validation
  - Inter-service communication
- Microservices:
  - Are transport-only (TCP)
  - Do **not** expose HTTP ports
- Docker networking uses **service names**, not `localhost`


## Quick Start (Docker)

#### Prerequisites
- Docker
- Docker Compose
- Node.js 18+ (optional, for local dev)


### Architecture Overview
#### High-Level Architecture

```
Client (Browser / Postman)
        |
        v
┌──────────────────┐
│   API Gateway    │  (HTTP)
│  (Port: 5001)    │
└──────────────────┘
        |
        | TCP (Internal Docker Network)
        |
 ┌────────────┐  ┌────────────┐  ┌────────────┐
 │ Auth       │  │ Service A  │  │ Service B  │
 │ Service    │  │            │  │            │
 │ (5002)     │  │ (5003)     │  │ (5004)     │
 └────────────┘  └────────────┘  └────────────┘
 ```
### How it works
- Clients **never** talk to microservices directly
- API Gateway handles:
  - HTTP routes
  - Request validation
  - Inter-service communication
- Microservices:
  - Are transport-only (TCP)
  - Do **not** expose HTTP ports
- Docker networking uses **service names**, not `localhost`


### Project Structure
```
.
├── apps/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── service-a/
│   └── service-b/
│
├── libs/
│   └── shared/
│
├── docker/
│   └── docker-compose.dev.yml
│
├── env/
│   ├── .env.dev
│   └── .env.docker
│
├── Dockerfile
├── nest-cli.json
├── package.json
└── README.md
```
### Quick Start (Docker)

Prerequisites
- Docker
- Docker Compose
- Node.js 18+ (optional, for local development)

### 1. Clone the repository

```bash
git clone https://github.com/sdevmarc/nestjs-microservices-starter-template.git
cd nestjs-microservices-starter-template
```

### 2. Configure environment variables

Edit the Docker environment file:
```bash
env/.env.docker
```
Example:
```bash
NODE_ENV=dev

API_GATEWAY_SERVICE_PORT=5001

AUTH_SERVICE_HOST=auth-service
AUTH_SERVICE_PORT=5002

SERVICE_A_HOST=service-a
SERVICE_A_PORT=5003

SERVICE_B_HOST=service-b
SERVICE_B_PORT=5004
```
> Important:
> Inside Docker, services must communicate using service names, not localhost.

### 3. Run with Docker Compose
```bash
npm run docker:dev
```

This will:
- Build all services
- Start all containers
- Create an internal Docker network
- Expose only the API Gateway to your host

## Testing the Application

All external traffic goes through the **API Gateway**.  
Microservices are **not exposed publicly** and should never be called directly.

### Base URL
`http://localhost:5001`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api` | API Gateway health check |
| GET | `/api/auth/hello` | Auth Service test |
| GET | `/api/service-a/hello` | Service A test |
| GET | `/api/service-b/hello` | Service B test |

### Example (Postman / Browser)
`GET http://localhost:5001/api/service-a/hello`

If everything is configured correctly, the request will:
1. Hit the API Gateway
2. Forward via TCP to the microservice
3. Return the response through the gateway


## Development Workflow

### Do I need to rebuild Docker after code changes?

**Yes**, when using Docker without volume mounts.

```bash
npm run docker:dev
```

Faster Development Options

For quicker iteration, you can:
- Run services locally using npm run start:dev
- Use Docker only for infrastructure (databases, Redis, etc.)
- Add volume mounts (advanced setup)

### Docker Networking Rules (Important)

Inside Docker containers:
- ❌ localhost does NOT refer to other services
- ✅ Use service names defined in docker-compose.yml

```bash
SERVICE_A_HOST=service-a
SERVICE_A_PORT=5003
```
This is why the API Gateway communicates successfully with services.

### Why TCP Microservices?
This project uses NestJS TCP transport because:
- Faster than HTTP for internal communication
- Clear separation between external and internal APIs
- Encourages message-based architecture
- Common in real production systems

Production Notes

This template is intentionally minimal but production-correct.

### In real deployments, you can extend it with:
- Redis / NATS / Kafka
- Authentication & authorization
- Centralized logging
- Health checks
- Kubernetes or Docker Swarm
- CI/CD pipelines

### Common Mistakes (Avoided Here)
- Calling microservices directly from the client
- Using localhost inside Docker
- Exposing microservice HTTP ports
- Mixing HTTP and TCP responsibilities
- Hardcoding environment values

This template avoids all of the above by design.

## 🤝 Contributing

Contributions are welcome.
- Fork the repository
- Create a feature branch
- Submit a Pull Request with a clear description

## 📄 License

```bash
GNU License
Free to use for personal and commercial projects.
```

## ⭐ Support

If this project helped you understand NestJS microservices,
consider giving it a ⭐ on GitHub and sharing it with others.

![NestJS](https://img.shields.io/badge/nestjs-v11-red)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License](https://img.shields.io/badge/license-MIT-green)
