'use strict';

const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const registerCrashHandler = require('./crash-util');
const Counter = require('./counter-service/counter');

registerCrashHandler();

const counter = new Counter();

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  server.send('ack', rinfo.port, rinfo.address, (err) => {});
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

const port = process.env.PORT || 5555;
server.bind(port);
