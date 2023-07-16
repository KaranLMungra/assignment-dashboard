# Dashboard

- *Nodejs version* >= 18.16.1
- *Backend* - expressjs
- *Frontend* - react + redux
- *Build Engine* - vite
- *Database ORM* - prisma
- *Database* - sqlite3

## Setup
- First execute command `npm install prisma --save-dev`.
- Then go to the root directory of the project.
- Install all the dependencies by running `npm install`.

## Run Server

- First complete all the steps in the setup.

### Developement Mode

- Execute the command `node server.js` to start the server in development mode.
- Then go to `http://localhost:3000/`.

### Production Mode

- Build all the file using the command `npx vite build`.
- Then execute the command `NODE_ENV=production node server.js` to start the server.
- The go to `http://localhost:3000/`.
