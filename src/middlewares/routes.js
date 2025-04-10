import { Database } from './database.js';

// Database
const database = new Database();
const TABLE_NAME = 'users';

// Routes
// The routes are defined as an array of objects, each object representing a route
// Each route object contains the HTTP method, path, and handler function
export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            // Set the response header - Text and status 200 - OK
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200; // OK
            res.end('Hello from the server!');
        }
    },
    {
        method: 'GET', 
        path: '/users',
        handler: (req, res) => {
            // Set the response header - JSON and status 200 - OK
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200; // OK
            const users = database.select(TABLE_NAME);
            res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            // Getting the request body 
            const newUser = { 
                name: req.body.name,
                email: req.body.email
            };
            // Insert
            database.insert(TABLE_NAME, newUser);
            // Set the response header - JSON and status 201 - Created
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201; // Created 
            res.end(JSON.stringify(newUser));
        }
    }
]