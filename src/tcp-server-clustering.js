'use strict';

const cluster = require('node:cluster');
const os = require('os');
const net = require('net');
const registerCrashHandler = require('./crash-util');
const Counter = require('./counter-service/counter');

registerCrashHandler();

const counter = new Counter();

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        // console.log(`server got: ${data} from ${socket.remoteAddress}:${socket.remotePort}`);

        // DO WORK
        counter.count(data)

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

server.on('close', () => {
    console.log('server closed')
})

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died 😵, starting a new one...`);
        cluster.fork();
    });
} else {
    // workers each listen to port 
    const port = process.env.PORT || 5555;
    server.listen(port);

    setInterval(() => {
        console.info(counter.getCount())
    }, 5000)
}

