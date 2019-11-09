// const initQueue = require('./httpHandler');

const messages = []; // the storage unit for messages
// initQueue.initialize(messages);


module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return messages.shift();
};