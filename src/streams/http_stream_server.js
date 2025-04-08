// run with: 
// ts-node ./src/streams/http_stream_server.js

import http from 'http';
import { Transform, Writable } from 'stream';


// Transform streamed data
class MyTrasformStream extends Transform {
    
    _transform(chunk, encoding, callback) {
        
        const altered = Number(chunk.toString()) * -1;
        
        callback(null, Buffer.from(altered.toString())); 
    }
}

class MyWriteStream extends Writable {

    _write(chunk, encoding, callback) {
        
        console.log(`Writing: ${ Number(chunk.toString() ) * 10}`);

        callback(); 
    }
}


// req = ReadableStream
// res = WritableStream

const server = http.createServer((req, res) => {
    return req.pipe(new MyTrasformStream())
              .pipe(new MyWriteStream());
});

server.listen(3334, () => {
    console.log('Server is running on port 3334');
});   