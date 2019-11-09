


const keypressHandler = require('./js/keypressHandler');
keypressHandler.initialize(message => console.log(`Message received: ${message}`));

const httpHandler = require('./js/httpHandler');


const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);


//Client side:
// input: arrow keys and/or move function
// output: swimteam moving
//Server side:
// input: ajax requests, or arrow keys/move commands
// output: responding to ajax GET requests with random, and making the swimteam move from arrow/move directions
