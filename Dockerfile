FROM principlestudios.azurecr.io/dotnet-static-files-server AS base

FROM node:16-alpine AS build-node
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY PrincipleStudios.Tools.Ui/package.json PrincipleStudios.Tools.Ui/package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
COPY PrincipleStudios.Tools.Ui/ .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN ./node_modules/.bin/jest
ARG PR_ID
ENV NEXT_PUBLIC_PR_ID=$PR_ID
RUN npm run build

FROM base AS final

# ARG GITHASH
# ENV BUILD__GITHASH=${GITHASH}
COPY --from=build-node /app/out ./wwwroot
