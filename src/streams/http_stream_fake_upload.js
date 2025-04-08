// Run first http_stream_server.js in one terminal
// Then run this script in another terminal

// run with: 
// ts-node ./src/streams/http_stream_fake_upload.js

import { Readable } from 'stream';

// Simulate a stream of data

class MyReadStream extends Readable {

    counter = 0;

    _read(){

        setTimeout(() => {

            if(this.counter > 100){
                this.push(null);
                return;
            }
            else{
                const buf = Buffer.from(this.counter.toString());
                this.counter ++;
    
                this.push(buf);
            }

        }, 250); // 250ms delay
    }  
}

// This will send the stream data to the server, simulating a file upload
fetch('http://localhost:3334', {
    method: 'POST',
    duplex: 'half',
    body: new MyReadStream(),
    headers: {
        'Content-Type': 'application/octet-stream'
    }
});