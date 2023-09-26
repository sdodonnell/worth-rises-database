# The Worth Rises Prison Database
The Worth Rises Database is a tool for untangling the network of companies profiting off of mass incarceration.

## Tools

- [Next.js](https://github.com/vercel/next.js), a full-stack framework for building applications with React.
- [React](https://github.com/facebook/react), a frontend JavaScript library.
- [react-table v7](https://github.com/tanstack/table/tree/v7), a library for building highly performant data-heavy tables in React.
- [Chakra UI](https://github.com/chakra-ui/chakra-ui), a simple and sleek UI component library for rapid prototyping.
- [Airtable](https://www.airtable.com/), a user-friendly spreadsheet app that serves as this site’s backend.

## Installation

If you’re installing this project, you’ve probably already received environment variables to connect to Airtable. If you’re thinking about installing this project and would like to access the database, reach out to me and I can provide you with a set of read-only variables.

To install, clone the repo and run the following commands:

```bash
npm install
npm run dev
```

## Project Structure

This project is divided into two parts: **pages** and **components**.

The `pages` directory contains the main app entrypoint in `pages/index.js` and the API route that fetches and normalizes data from Airtable. It also contains the standard `_app.js` and `_document.js` files typically included in Next.js applications.

The `components` directory contains all of the UI components used in the application, their styles, and several utilities for generating copy.

## Deployment

This application is deployed on Vercel. Opening a pull request will trigger a staging build and add a link to the pull request body. Merging a pull request to `main` will trigger a new deploy automatically.

## Contributing

Issues and pull requests are more than welcome!
