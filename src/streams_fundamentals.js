// run with: 
// ts-node ./src/streams_fundamentals.js


import { Readable } from 'stream';

// This is a simple example to understand how streams work in NodeJs.

class MyStream extends Readable {

    // Simulate a stream of data

    counter = 0;

    _read(){

        setTimeout(() => {

            if(this.counter > 100){
                // end the stream
                this.push(null);
                return;
            }
            else{
                // create a buffer from the counter
                const buf = Buffer.from(this.counter.toString() + ",");
                this.counter ++;
    
                // push the buffer to the stream
                this.push(buf);
            }

        }, 250); // 250ms delay
    }  
}

// create a new instance of the stream and pipe it to the stdout
const myStream = new MyStream().pipe(process.stdout);           