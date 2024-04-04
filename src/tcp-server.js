'use strict';

const cluster = require('node:cluster');
const os = require('os');
const net = require('net');

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died 😵, starting a new one...`);
        cluster.fork();
    });
} else {
    // workers break off and share the port

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
}

