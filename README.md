# Expa Frontend

## About
This is the frontend for the Expa project. It is a React application written in TypeScript and built ontop of the NextJS framework. It is currently in development.

## Running the frontend locally for development
To run the frontend locally, you need to have Node.js installed. You can download it from [here](https://nodejs.org/en/download/). After you have installed Node.js, you can run the frontend by running the following commands in the root directory of the project:

```bash
$ npm install
$ npm run dev
```

## Deploying the frontend to the cluster
To deploy the frontend to the cluster you need to have the following tools installed:
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

And you need a Kubernetes cluster. You can create one using [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/).

After you have installed and configured the tools, you can deploy the frontend by running the following commands in the root directory of the project:

```bash
kubectl create -f 00-config.yml
kubectl create -f 01-deployment.yml
```

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
