// run with: 
// ts-node ./src/streams/http_stream_server.js

import http from 'http';
import { Transform, Writable } from 'stream';


// Transform streamed partial data
class MyTrasformStream extends Transform {
    
    _transform(chunk, encoding, callback) {
        
        const altered = Number(chunk.toString()) * -1;
        
        callback(null, Buffer.from(altered.toString())); 
    }
}

// Process/use streamed partial data
class MyWriteStream extends Writable {

    _write(chunk, encoding, callback) {
        
        console.log(`Writing: ${ Number(chunk.toString() ) * 10}`);

        callback(); 
    }
}


// req = ReadableStream
// res = WritableStream

const server = http.createServer( async (req, res) => {

    // Canalize the request stream to the transform and write streams
    req.pipe(new MyTrasformStream())
       .pipe(new MyWriteStream());
    
    // To get all the content from the stream
    const buffers =[];

    // Await works on streams, the loop iterates as data arrives.
    // Await ensures that something will only be executed after for, after the stream ends
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(`Full stream content: ${fullStreamContent}`);

    // send the response
    res.end(fullStreamContent);
});

server.listen(3334, () => {
    console.log('Server is running on port 3334');
});   