FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-dotnet
WORKDIR /src

COPY ["./PrincipleStudios.Tools.sln", "./"]
COPY ["./PrincipleStudios.Tools.Server/PrincipleStudios.Tools.Server.csproj", "./PrincipleStudios.Tools.Server/"]
# COPY ["./PrincipleStudios.Tools.Tests/PrincipleStudios.Tools.Tests.csproj", "./PrincipleStudios.Tools.Tests/"]
RUN dotnet restore

# COPY ./schemas/ ./schemas/
COPY ./PrincipleStudios.Tools.Server/ ./PrincipleStudios.Tools.Server/
# COPY ./PrincipleStudios.Tools.Tests/ ./PrincipleStudios.Tools.Tests/
# COPY ./Directory.Build.props .
# WORKDIR "/src/PrincipleStudios.Tools.Tests"
# RUN dotnet build -p:SkipUiBuild=true
# RUN dotnet test --no-build
WORKDIR "/src/PrincipleStudios.Tools.Server"
RUN dotnet build "PrincipleStudios.Tools.Server.csproj" -c Release -o /app/build

FROM build-dotnet AS publish-dotnet
RUN dotnet publish "PrincipleStudios.Tools.Server.csproj" -c Release -o /app/publish -p:SkipUiBuild=true


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
RUN npm run build

FROM base AS final

WORKDIR /app
COPY --from=publish-dotnet /app/publish .
ENTRYPOINT ["dotnet", "PrincipleStudios.Tools.Server.dll"]

# ARG GITHASH
# ENV BUILD__GITHASH=${GITHASH}
COPY --from=build-node /app/out ./wwwroot
