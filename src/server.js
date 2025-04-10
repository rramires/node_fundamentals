// Importing required modules
import http from 'node:http';
import { jsonMid } from './middlewares/jsonMid.js';
import { routes } from './middlewares/routes.js';

// Database

// Create a server
const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    
    // Middleware to parse JSON body
    await jsonMid(req, res);
    //console.log('Request received:', { method, url, req.body });

    // Find routes
    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    });
    //console.log('Route found:', route);
    // The handler function is called when the route is matched
    if(route) {
        const routeParams = req.url.match(route.path);
        //console.log('Route params:', routeParams);

        // add params to the request object
        req.params = { ...routeParams.groups };
        //console.log('req.params:', req.params);

        return route.handler(req, res);
    }
    // If try to access a non-existent route   
    return res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Route not found');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});