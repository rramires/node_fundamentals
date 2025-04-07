// CommonJS module
// const http = require('http');

// To use import, it was defined in package.json: type": "module"
//import http from 'node:http'; // Ok, it works

// Interesting convention node:internalModule to differentiate node-internal modules from third-party ones
import http from 'node:http';

// Create a server
const server = http.createServer((req, res) => {

    console.log('Request received');

    res.end('Hello World!');
});

// Run the server
server.listen(3333, () => {
    console.log('Server is running on port 3333');
});