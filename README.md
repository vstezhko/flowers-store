# 🌺 Flower Store

Welcome to our Flower Store project! 🌼 This web application is designed to bring the enchanting world of flowers to our customers in a delightful digital environment. As an online flower shop, we offer a wide array of vibrant and captivating blooms, as well as other related products that are sure to bring smiles to your faces and warmth to your hearts.

Our Flower Store web application ensures that shopping for flowers is a joyous and immersive experience 🏪. From the moment you step into our virtual store, you'll be greeted with a visually appealing display of bouquets, arrangements, and gifts that mirror the charm of an actual flower boutique.

## Features

Key Features of our Flower Shop:

🌷 Extensive Collection: Browse through a delightful collection of fresh flowers and elegant bouquets carefully curated to suit all occasions, be it birthdays, anniversaries, weddings, or just to brighten someone's day.

🏠 Interactive Main Page: Our main page welcomes you with stunning floral floral arrangements, highlighting the season's best picks and special offers that captivate your senses.

📋 Detailed Product Pages: Click on any bouquet or arrangement to explore in-depth details, including flower types, colors, and variants.

🌸 Search and Sorting: Easily find your favorite flowers or gifts using our category selector, search and sorting features, allowing you to quickly navigate through our diverse selection.

🛒 User-Friendly Cart: Add your chosen flowers and gifts to the shopping cart with a click, review your selections, and seamlessly proceed to checkout for a hassle-free shopping experience.

🔍 About Us: Learn more about our passion for flowers, our team of dedicated florists, and our commitment to providing the freshest and most beautiful blooms.

👤 User Accounts: Create your personal account to simplify the ordering procedure and receive exclusive offers and discounts.

At our Flower Store, we take pride in offering an exceptional floral shopping experience. Whether you're celebrating a special moment or expressing your heartfelt emotions, we are here to make your flower-gifting experience memorable and full of blooming surprises! 🌹🌺🌻

## Technologies

This project is built using the following technologies:

| Technology                    | Description                                                                                                                                                                                                                                                                                         |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![Next.js][Next.js]][Next-url]           | A React-based framework for building server-rendered and statically-generated web applications. The project was initiated using the [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), which helped to streamline the development process.        |
| [![Redux Toolkit Badge][redux-badge]][redux-url] | The official, opinionated, batteries-included toolset for efficient Redux development. It includes utilities to simplify common use cases like store setup, creating reducers and actions, and managing immutable updates.                                                                                                 |
| [![Material-UI Badge][mui-badge]][mui-url]   | A popular React UI framework that implements Google's Material Design guidelines. It provides a set of reusable components and customization options to help developers build beautiful and responsive user interfaces.                                                                             |
| [![TypeScript][ts-badge]][ts-url]   | TypeScript is a strict syntactical superset of JavaScript that adds optional type annotations to the language and improves the readability and maintainability of their code.                                                                           |

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

## Contributing

Contributions are welcome! If you have an idea for a new feature or improvement, feel free to open an issue or submit a pull request.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[redux-badge]: https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux-toolkit.js.org/
[mui-badge]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[mui-url]: https://mui.com/
[ts-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/
