This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Before running this project, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. This project is powered by Node.js version 18.17 and npm version 9.8.1. 

You can check if you have them installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

If not, follow the instructions on the Node.js and npm websites to install them.

Once you have Node.js and npm installed, clone this repository to your local machine and navigate to the project’s root directory:

```bash
git clone <URL>
cd <flowers-store>
```

Then, install the project’s dependencies by running:

```bash
npm install
```

As an alternative to npm, you could use yarn or pnpm package managers. To install them, follow the instructions on the official [Yarn](https://yarnpkg.com/getting-started/install) or [pnpm](https://pnpm.io/installation) websites respectively.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

This project uses the following npm scripts:

- `npm run dev` - starts the application in development mode.
- `npm run build` - builds the application for production.
- `npm run start` - starts the built application.
- `npm run lint` - checks the code for compliance with the linter rules.
- `npm run fix-lint` - fixes some issues found by the linter.
- `npm run format` - formats the code using Prettier.
- `npm run check-format` - checks if the code complies with Prettier's formatting requirements.
- `npm run test` - runs tests.

You can run these scripts from the command line while in the project's root directory.

This project also uses [Husky](https://typicode.github.io/husky) to run scripts as git hooks. The following hooks are configured:

- `pre-commit` - runs the `fix-lint`, `lint`, `format`, `check-format`, and `test` scripts before each commit. If any of these scripts fail, the commit will be aborted.

You can modify the behavior of these hooks by editing the corresponding files in the `.husky` directory.
