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

// Stateful X Stateless
// Stateful - The server maintains the state of the client
// Stateless - The server does not maintain the state of the client

// Stateless
const users = [];

// Create a server
const server = http.createServer((req, res) => {

    const { method, url } = req;
    // Log the request method and URL
    /* 
    console.log(`Request method: ${method}`);  
    console.log(`Request URL: ${url}`); 
    */

    // Creating very simple routes, just for understanding

    // Hello, at the root of the server
    if (method === 'GET' && url === '/') {
        
        // Set the response header - Text and status 200 - OK
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        // or
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200; // OK

        res.end('Hello World, from server!');
        return;
    }

    // GET Route to get a list of users
    if (method === 'GET' && url === '/users') {

        // Set the response header - JSON and status 200 - OK
        //res.writeHead(200, { 'Content-Type': 'application/json' });
        // or
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200; // OK

        // Simulating a database operation - return users array
        res.end(JSON.stringify(users));
        return;
    }

    // POST Route to create a new user
    if (method === 'POST' && url === '/users') {

        const newUser = { id: users.length + 1, name: 'John Doe ' + (users.length + 1) };

        // Simulating a database operation - inserting a new user in array
        users.push(newUser);

        // Set the response header - JSON and status 201 - Created
        //res.writeHead(201, { 'Content-Type': 'application/json' });
        // or
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201; // Created 

        res.end(JSON.stringify(newUser));
        return;
    }

    // If try to access a non-existent route   
    return res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Route not found');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});