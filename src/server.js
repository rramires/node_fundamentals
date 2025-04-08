// CommonJS module
// const http = require('http');

// To use import, it was defined in package.json: type": "module"
//import http from 'node:http'; // Ok, it works

// Interesting convention node:internalModule to differentiate node-internal modules from third-party ones
import http from 'node:http';


// Stateless
const users = [];

// Create a server
const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    
    // Retrieving the request body
    const buffers =[];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    }
    catch{
        req.body = null;
    }
    //console.log('Request received:', { method, url, body });


    // POST Route to create a new user
    if (method === 'POST' && url === '/users') {

        // Getting the request body 
        const newUser = { id: users.length + 1, 
            name: req.body.name + " " + (users.length + 1),
            email: req.body.email
        };

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

    // If try to access a non-existent route   
    return res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Route not found');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});