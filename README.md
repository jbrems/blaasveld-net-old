#Blaasveld-net
The monorepository for the Blaasveld.net project.  
Built with Angular Universal and Express.

## Run locally
Use `npm run dev:ssr` to start a local dev server on http://localhost:4200.

## Tests & code style
Use `npm t` to run the Angular tests for the client.  

Use `npm run cy:run` to run the Cypress E2E tests for the client. *Make sure the client is running on port `4200`.*

Use `npm run jest` to run the Jest tests for the server.

The project is set up with Eslint which can be enabled in the IDE or run with `npm run lint`.
