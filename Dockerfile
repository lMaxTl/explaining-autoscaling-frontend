# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set the working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
# Copy package.json and all related lock files to the working directory
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Check if yarn.lock exists, if so install dependencies with yarn
# Check if package-lock.json exists, if so install dependencies with npm ci
# Check if pnpm-lock.yaml exists, if so install dependencies with pnpm
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /app
# Copy installed dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all remaining files to the working directory
COPY . .

# Set the environment variable to disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1
# Run the build command
RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
# Set the working directory
WORKDIR /app
# Set the environment variable for the Node.js environment to production
ENV NODE_ENV production
# Set the environment variable to disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Create a nodejs group with a gid of 1001
RUN addgroup --system --gid 1001 nodejs
# Create a nextjs user with a uid of 1001 and add it to the nodejs group
RUN adduser --system --uid 1001 nextjs

# Copy the public folder to the working directory
COPY --from=builder /app/public ./public

# Copy the standalone and static directories from the build stage
# to the working directory and set the owner to the nextjs user and nodejs group
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user for the container to nextjs
USER nextjs

# Expose port 9001
EXPOSE 9001

# Set the PORT environment variable to 9001
ENV PORT 9001

# Run the server
CMD ["node", "server.js"]


