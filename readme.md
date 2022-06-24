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

## Deployments

Deployments are entirely handled via GitHub actions.
- When a PR is opened or updated, a preview site will automatically be set up.
  This preview will contain all update both in the PR and in main due to how
  GitHub runs the actions.
- When a PR is completed, the preview site will automatically be torn down.
- When a commit is pushed to main, GitHub actions will build and deploy the
  branch.
