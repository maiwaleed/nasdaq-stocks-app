# Nasdaq Stocks App

This is a React + TypeScript web application built using Vite. The app provides an interface to search for Nasdaq-listed stocks. It uses a clean and modern UI and connects to [polygon.io](https://polygon.io/) API to display matching results. The app is designed for performance and scalability, leveraging powerful libraries for UI components, state management, and testing.

## Deployed App

You can view the deployed version of the app here:  
[Stock market app](https://maiwaleed.github.io/nasdaq-stocks-app/)

## 🔧 Tech Stack & Libraries

Here are some of the most important libraries and tools used in the project:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static type-checking to JavaScript.
- **Vite**: Fast build tool and development server.
- **Zustand**: For lightweight and intuitive state management.
- **shadcn/ui**: Beautifully styled and customizable UI components built on top of Radix UI and Tailwind CSS.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: Icon library used for UI elements.
- **Lodash.debounce**: Utility function used to limit API calls while typing.
- **React Router**: For handling navigation and routing.
- **React Testing Library** + **Jest**: For writing and running unit/integration tests.

## 🚀 Getting Started

Make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **Yarn** (v1.22 or higher)

You can check if you have Yarn and Node.js installed by running the following commands:

```bash
node -v
yarn -v
```

If they're not installed, follow the instructions from their official websites:

- [Install Node.js](https://nodejs.org/)
- [Install Yarn](https://yarnpkg.com/getting-started/install)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/maiwaleed/nasdaq-stocks-app.git
cd nasdaq-stocks-app
```

2. Install the dependencies using Yarn:

```bash
yarn install
```

## Development

To run the project in development mode:

```bash
yarn dev
```

This will start the Vite development server, and you can open the application in your browser at `http://localhost:3000`.

## Building for Production

To create a production build of the application, run:

```bash
yarn build
```

This will create a `dist/` folder with the production-ready build.

To preview the production build locally:

```bash
yarn preview
```

This will start a local server and allow you to preview the production build at `http://localhost:5173`.

## Running Tests

To run the tests for the application, you can use Jest. If you're using **Yarn**, run:

```bash
yarn test
```

This will run the test suite using Jest.

## Project Structure

Here’s a brief overview of the project's structure:

- `src/` – Contains all the source code.
  - `components/` – Contains reusable components.
  - `store/` – Contains state management logic ( Zustand ).
  - `api/` – API utility functions.
  - `assets/` – Contains images, icons, and other static files.
- `public/` – Contains the public files for the app.

## 📦 Notes

- Make sure to configure your `.env` file with any required API keys if needed.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
