// CommonJS module
// const http = require('http');

// To use import, it was defined in package.json: type": "module"
//import http from 'node:http'; // Ok, it works

// Interesting convention node:internalModule to differentiate node-internal modules from third-party ones
import http from 'node:http';
import { jsonMid } from './middlewares/jsonMid.js';
import { Database } from './middlewares/database.js';


// Database
const TABLE_NAME = 'users';
const database = new Database()

// Create a server
const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    
    // Middleware to parse JSON body
    await jsonMid(req, res);
    //console.log('Request received:', { method, url, body });


    // POST Route to create a new user
    if (method === 'POST' && url === '/users') {

        // Getting the request body 
        const newUser = { 
            name: req.body.name,
            email: req.body.email
        };

        // Insert
        database.insert(TABLE_NAME, newUser);

        // Set the response header - JSON and status 201 - Created
        //res.writeHead(201, { 'Content-Type': 'application/json' });
        // or
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201; // Created 

        res.end(JSON.stringify(newUser));
        return;
    }


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

        const users = database.select(TABLE_NAME);
        
        res.end(JSON.stringify(users));
        return;
    }

    // If try to access a non-existent route   
    return res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Route not found');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});