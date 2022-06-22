# Site for Principle.Tools

## Development

### Prerequisites:

- dotnet 6
- node 16+
- npm 8.9+

### Local development instructions

1. Run the following from `./PrincipleStudios.Tools.Ui`:

    ```sh
    npm install # after branch changes only
    npm start
    ```

Currently, the C# server does not have any functionality required for local development.

## Build

### Prerequisites

- docker cli (either via Docker Desktop or Rancher Desktop)

### Instructions

1. Run the following from the repository root:

    ```sh
    docker build .
    ```
