// run with: 
// ts-node ./src/streams/buffer.js

const buf = Buffer.from('Hello');	

/*
    Buffer is how NodeJs stores data in memory in a much faster way to write and read.  
 */
 
// Use HEX base 16
// 48 = H, 65 = e, 6c = l, etc
console.log(buf);	// <Buffer 48 65 6c 6c 6f> 

// Use base 10
console.log(buf.toJSON());    // { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }

console.log(buf.toString());	// Hello

