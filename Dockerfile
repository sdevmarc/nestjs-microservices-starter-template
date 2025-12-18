FROM node:20-alpine AS builder

WORKDIR /workspace

# Copy workspace config FIRST
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

# Copy the rest of the workspace
COPY apps ./apps
COPY libs ./libs

# Build ALL apps
RUN npm run build

# ------------------------------

FROM node:20-alpine

WORKDIR /workspace

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/dist ./dist

CMD ["node"]