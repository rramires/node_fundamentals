# node_fundamentals
Beginning of NodeJs studies


### Basic NodeJs configuration

1 - Start the project

```sh
npm init -y 
```

2 - Change the configuration in package.json to use import instead of require  
Add "type": "module" at the beginning along with the project name, version etc

```json
"type": "module",
```

3 - Create basic http server, on src folder

```javascript
// import
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
```


4 - Add the command to run, using --watch in the scripts section of package.json

```json
"dev": "node --watch src/server.js"
```

5 - Running

```sh
npm run dev 
```