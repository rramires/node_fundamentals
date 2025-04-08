export async function jsonMid(req, res) {

    // Retrieving the request body
    const buffers =[];
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    }
    catch{
        req.body = null;
    }

    res.setHeader('Content-Type', 'application/json');
}