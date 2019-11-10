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

  if (req.method === 'GET') {

    res.writeHead(200, headers);
    const fileUrl = req.url.split("=")[1];
    // console.log(fileUrl);

    if (fileUrl) {

      //grab current path in string
      let imageDir = `/spec/${fileUrl}`;
      var fullPath = path.dirname(__dirname) + imageDir;
      console.log(fullPath);
      fs.copyFile(fullPath, path.dirname(__dirname) + '/background.jpg',(err) => {
        if (err) {
          console.log("AN ERROR IN THE SERVER COPY");
          throw err;
        }
      });
      res.write(path.dirname(__dirname) + '/background.jpg');
      // console.log(res);
    }
    else {
      const oneMessage = messages.dequeue();
      if (oneMessage) {
        res.write(""+oneMessage);
      };

    }


    res.end();

    }
  next(); // invoke next() at the end of a request to help with testing!
};
