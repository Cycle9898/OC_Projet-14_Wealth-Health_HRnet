# OpenClassroom project 14 : Wealth Health 's HRnet

## Introduction

This project represents a web application allowing HR agents of the fictitious company Wealth Health to log in,
 add or edit an employee entry with a dedicated form, consult the employees list or delete an employee entry.

It was bootstrapped with [Vite JS](https://vitejs.dev/), [react](https://react.dev/) and [typescript](https://www.typescriptlang.org/).

The initial [HRnet](https://github.com/OpenClassrooms-Student-Center/P12_Front-end) was a legacy JQuery application.

The goal was to convert it into an efficient React application.

Some features have also been added like HR Users authentication, editing or deleting an employee entry,
 an API (back-end with a MongoDB database) to store sustainably or interact with HR users and employees data.

More infos on this API [here](https://github.com/Cycle9898/OC_Projet-14_Wealth-Health_Back-end).

One of the 4 JQuery libs, the [drop-down list](https://github.com/jquery/jquery-ui/blob/main/ui/widgets/selectmenu.js),
 was also converted into a React lib.
 See it on [NPM](https://www.npmjs.com/package/@cycle9898/react-custom-dropdown-component).

Performance checks, to compare the 2 applications' efficiency, have been made with [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).

## Prerequisites

- [Node.JS](https://nodejs.org/en)

- [Yarn](https://yarnpkg.com/)

- [MongoDB](https://www.mongodb.com/try/download/community)

# Getting Started (Back-end)

Follow [these instructions](https://github.com/Cycle9898/OC_Projet-14_Wealth-Health_Back-end) to set up the back-end part.

# Getting Started (Front-end)

- Clone this repo : `git clone https://github.com/Cycle9898/OC_Projet-14_Wealth-Health_HRnet.git`

- Inside the cloned folder, install all dependencies with : `yarn`

- Then start the front-end part with : `yarn dev`

This command runs the app in the development mode.

Open http://localhost:5173 (default URL) to view it in the browser.

It is also possible to run an optimized app after building it :

```bash
yarn build
# Test it
yarn preview
```

Open http://localhost:4173/ (default URL) to view it in the browser.

# Environment variables

It is possible to modify API URL with an environment variable.

Create or modify the .env file in the project's root and add this one :

***VITE_API_URL***

It will modify the API base URL.

Otherwise, the default base URL is "http://localhost:3001/api/v1".

# Lighthouse JSON reports

The Lighthouse reports can be found inside the 'Lighthouse_reports' folder (project's root), in JSON format.

Got to [Lighthouse viewer website](https://googlechrome.github.io/lighthouse/viewer/) to view it in a more human readable format and compare the 2 applications' performance.