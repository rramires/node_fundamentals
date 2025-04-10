import { Database } from './database.js';
import { buildRoutePath } from '../utils/build-route-path.js';

// Database
const database = new Database();
const TABLE_NAME = 'users';

// Routes
// The routes are defined as an array of objects, each object representing a route
// Each route object contains the HTTP method, path, and handler function
export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/'),
        handler: (req, res) => {
            // Set the response header - Text and status 200 - OK
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200; // OK
            res.end('Hello from the server!');
        }
    },
    {
        method: 'GET', 
        path: buildRoutePath('/users'),
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
        path: buildRoutePath('/users'),
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
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

            const { id } = req.params;
            //console.log('id:', id);

            // delete
            const sucess = database.delete(TABLE_NAME, id);
            //console.log('sucess:', sucess);

            // Set the response header - JSON and status 204 - No Content or 404 - Not Found
            sucess ? res.writeHead(204).end() : res.writeHead(404).end('User not found');       
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

            const { id } = req.params;
            //console.log('id:', id);
            
            const { name, email } = req.body;
            //console.log('name:', name, 'email:', email);

            // Update
            const sucess = database.update(TABLE_NAME, id, { name, email });
            //console.log('sucess:', sucess);

            // Set the response header - JSON and status 204 - No Content or 404 - Not Found
            sucess ? res.writeHead(204).end() : res.writeHead(404).end('User not found');       
        }
    }
]