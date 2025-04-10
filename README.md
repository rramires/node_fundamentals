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

---

### The difference between writeHead and setHeader

**setHeader** is used to set a single header field. We can add multiple setHeaders

```javascript
let body = "hello world";
response.setHeader("Content-Length", body.length);
response.setHeader("Content-Type", "text/plain");
response.setHeader("Set-Cookie", "type=ninja");
response.status(200);
```

**writeHead** is used to set multiple header fields and the status code

```javascript
let body = "hello world";
response.writeHead(200, {
    "Content-Length": body.length,
    "Content-Type": "text/plain",
    "Set-Cookie": "type=ninja"
});
```

---

### The 3 types of http request

**Query Parameters** - (Stateful URL) Filters, pagination,   
non-mandatory parameters, since the parameters are exposed  
**GET** http://localhost:3333/users?userActive1&sorting=descending   

**Router Parameters** - Identification of a resource  
**GET** http://localhost:3333/users/1 - Gets user 1  
**PUT** http://localhost:3333/users/1 - Updates user 1  
**PATCH** http://localhost:3333/users/1 - Updates partial data of user 1  
**DELETE** http://localhost:3333/users/1 - Deletes user 1  

**Request Body** - Sending information from a form.  
It is protected if you use HTTPS in production  
**POST** http://localhost:3333/users  
Hidden in the request body:

```json
{ "name": "Tom", "email": "tom@email.com" }    
```

---

### Stateful X Stateless
**Stateful** - The server maintains the state of the client  
**Stateless** - The server does not maintain the state of the client  

---

### HTTP methods are used to define the action to be performed on a resource.

**GET** - Use to retrieve data from a server  
**POST** - Use to send data to a server  
**PUT** - Use to update existing data on a server  
**PATCH** - Use to apply partial modifications to a resource  
**DELETE** - Use to remove data from a server  

**We can have more than one method per route**  

For example:  
**POST** /users - Create a new user  
**GET** /users - Get a list of users  
**GET** /users/:id - Get a specific user  
**PUT** /users/:id - Update a specific user  
**DELETE** /users/:id - Delete a specific user  

---

### Most used HTTP status codes

**Success Codes:**  
**200 OK** - Used in **GET, PUT, PATCH** (successful request with response body)  
**201 Created** - Used in **POST** (new resource created)  
**204 No Content** - Used in **DELETE, PUT, PATCH** (successful request, no response body)

**Client Error Codes:**  
**400 Bad Request** - Used in all methods (invalid request syntax)  
**401 Unauthorized** - Used in all methods (authentication required)  
**403 Forbidden** - Used in all methods (no permission)  
**404 Not Found** - Used in all methods (resource doesn't exist)  
**409 Conflict** - Used in **POST** (resource exists), **PUT/PATCH** (version conflict), **DELETE** (dependencies)

**Server Error Codes:**  
**500 Internal Server Error** - Used in all methods (server failure)  
**502 Bad Gateway** - Failure in server gateway ou proxy  

**All HTTP response status codes:**   
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)  


