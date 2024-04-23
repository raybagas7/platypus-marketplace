# Platypus E-commerce Website

## Overview

Platypus is an e-commerce platform designed to streamline the entire online shopping experience. The platform offers a suite of features for both merchants and buyers. I have led front-end development projects and have been recognized as an Outstanding Contributor on the team.

## Prerequisites

- Node.js v20+
- npm

## Tech Stack

- Next.js 14 with TypeScript
- Tailwind CSS
- Zustand
- Axios
- Zod
- Shandcn UI
- Daisy UI

## Development Dependencies

- Husky
- ESLint
- Prettier
- Jest

## Installation / Run Locally

Clone the project

```bash
  git https://github.com/raybagas7/platypus-marketplace.git
```

Go to the project directory

```bash
  cd platypus-marketplace
```

Install dependencies

```bash
  npm install
```

Environment variable

```bash
  cp .env.example .env
```

**_follow the .env.example and fill every variable and base api url with your needs_**

Start the application in Development mode.

```bash
  npm run dev
```

**_(Web app will run on port 3000 by default)_**

To build and start the application you can run this command

```bash
  npm run build
```

```bash
  npm run start
```

**_(Web app will run on port 3000 by default)_**

## Development

When you want to continue developing this application, follow these steps:

- **Initialize Husky**: Run the following command to initialize Husky:

  ```bash
  npm run prepare
  ```

  Husky will be initiated, and every time you commit, Husky pre-commit will intercept the commit and run tests before it is committed.

  1.**Prettier Test**: Husky will run a Prettier test. If it fails, you must fix it manually by following the Prettier style or by running:

  ```bash
  npm run write-format
  ```

  2.**Linter Check**: Husky will perform a linting check. If the linter fails, there will be information in the terminal, and you must fix it manually.

  3.**TypeScript Type Checking**: Husky will check TypeScript types. If it passes, the commit will be completed if you have already defined the commit message. If not, you will need to write the commit message.

  4.**Build Test (Optional)**: Additionally, there is a build test included in the pre-commit file. This test is currently commented out to avoid slowing down the development process, as the build process may take some time. If you want to run the build test, uncomment the script in the pre-commit file.

## Testing

This project is covered by two types of tests: unit tests using Jest and end-to-end tests using Cypress.

### Unit Test | Jest

To test the application, you can run unit tests with Jest. To run the tests once, use the following command:

```bash
npm run test
```

If you want to develop more or perform continuous testing, you can run the tests in watch mode:

```bash
npm run test:watch
```

If you want to add more test case, the test directory is on root directory
