// run with: 
// ts-node ./src/streams/streams_fundamentals.js


import { Readable, Writable, Transform } from 'stream';

// This is a simple example to understand how streams work in NodeJs.

// Using readable streams to read data from a source
class MyReadStream extends Readable {

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
                const buf = Buffer.from(this.counter.toString());
                this.counter ++;
    
                // push the buffer to the stream
                this.push(buf);
            }

        }, 250); // 250ms delay
    }  
}


// Using transform streams to transform data 

class MyTrasformStream extends Transform {
    // Simulate a stream of data
    _transform(chunk, encoding, callback) {
        
        const altered = Number(chunk.toString()) * -1;

        /*
            This is where we change/process the data that arrives and will be output to the writable.
        */

        // null in first parameter in callback = no error
        // If there was any testing on the data, this would be the place to throw a possible error
        callback(null, Buffer.from(altered.toString())); 
    }
}


// Using writable streams to write data to a destination

class MyWriteStream extends Writable {

    // Simulate a stream of data
    _write(chunk, encoding, callback) {
        
        // Chunk is a buffer, which was inserted in the push of the example above "this.push(buf)"
        //  We can convert buffer to a number and then multiply it by 10
        console.log(`Writing: ${ Number(chunk.toString() ) * 10}`);

        /*
            Try to imagine in the previous class in _read, you being able 
            to read parts of a large file and send them with push.
            Now in this class here in write you can take these parts, 
            process and write to disk, or save to a database, for example. 
            This is before the large file is entirely downloaded 
            or uploaded depending on the case.
        */

        // call the callback to signal that the write is complete
        callback(); 
    }
}

// create a new instance of the stream and pipe it to the stdout
const myStream = new MyReadStream() // Read data
        .pipe(new MyTrasformStream()) // transform data
        .pipe(new MyWriteStream()); // write received data      



           