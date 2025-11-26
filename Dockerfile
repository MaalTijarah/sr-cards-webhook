# ---------------------------
# 1️⃣ Build Stage
# ---------------------------
FROM node:20-alpine AS builder


# Enable Corepack (for pnpm)
RUN corepack enable

WORKDIR /app

# Copy only package files
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN pnpm run build


# ---------------------------
# 2️⃣ Production Stage
# ---------------------------
FROM node:20-alpine AS runner

# Add CA certificates (fix TLS error)
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Enable Corepack for pnpm runtime (optional)
RUN corepack enable

# Copy built app and node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json tsconfig.json .

ENV NODE_ENV=production

CMD ["pnpm", "start", ":prod"]
