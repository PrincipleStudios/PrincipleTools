FROM principlestudios.azurecr.io/dotnet-static-files-server AS base

FROM node:16-alpine AS build-node
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat brotli git
WORKDIR /app

COPY PrincipleStudios.Tools.Ui/package.json PrincipleStudios.Tools.Ui/package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
COPY adr/ /adr/
COPY PrincipleStudios.Tools.Ui/ .
COPY .git/ /.git/

# Disable Astro telemetry
ENV ASTRO_TELEMETRY_DISABLED=1

ARG GIT_HASH=HEAD
ENV GIT_HASH=${GIT_HASH}
ARG DOMAIN=https://principle.tools
ARG PR_ID
ENV PR_ID=$PR_ID
RUN npm run build -- --site $DOMAIN

WORKDIR /app/dist

RUN echo $GIT_HASH > ./git-version.txt

RUN find . -type f -exec gzip -k "{}" \; -exec brotli -k "{}" \;

FROM base AS final

COPY --from=build-node /app/dist ./wwwroot
