'use strict';

const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(`server got: ${data} from ${socket.remoteAddress}:${socket.remotePort}`);
    socket.write("ack")
    socket.end();
  });

  socket.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.listen(5555);