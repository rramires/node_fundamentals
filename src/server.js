// CommonJS module
// const http = require('http');

// To use import, it was defined in package.json: type": "module"
//import http from 'node:http'; // Ok, it works

// Interesting convention node:internalModule to differentiate node-internal modules from third-party ones
import http from 'node:http';

// HTTP methods are used to define the action to be performed on a resource.

// GET  - Use to retrieve data from a server
// POST - Use to send data to a server
// PUT  - Use to update existing data on a server
// PATCH - Use to apply partial modifications to a resource
// DELETE - Use to remove data from a server

// We can have more than one method per route
// For example:
// POST /users - Create a new user
// GET /users - Get a list of users
// GET /users/:id - Get a specific user
// PUT /users/:id - Update a specific user
// DELETE /users/:id - Delete a specific user
 
// Create a server
const server = http.createServer((req, res) => {

    const { method, url } = req;
    // Log the request method and URL
    console.log(`Request method: ${method}`);  
    console.log(`Request URL: ${url}`);

    res.end('Hello World!');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});