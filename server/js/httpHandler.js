const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);
  if (req.method === 'GET') {
    // const array = ['up', 'down', 'right', 'left'];
    // var randomIdx = Math.floor(Math.random() * array.length);
    // res.write(array[randomIdx]);
    const oneMessage = messages.dequeue();
    // console.log("" + oneMessage + typeof(oneMessage));
    if(oneMessage) {
      res.write(""+oneMessage);
    };

    }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
