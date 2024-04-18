const cluster = require('cluster');

const sharedArray = [];
let addFork;
let deleteFork;

if (cluster.isMaster) {
    // Create two forks
    addFork = cluster.fork();
    deleteFork = cluster.fork();

    // Shared array to store items
    
    addFork.on('online', () => {
        addFork.send({ action: 'add' });
    });

    // Assign the deleteItem function to the deleteFork
    deleteFork.on('online', () => {
        deleteFork.send({ action: 'delete' });
    });

} else {
    process.on('message', (message) => {
        if (message.action === 'add') {
            // Call the addItem function to add items
            console.log(message);
            deleteItem();

        } else if (message.action === 'delete') {
            // Call the deleteItem function to delete items
            console.log(message);
        }
    });
}

function addItem() {
    if (addFork && addFork.isConnected()) {
        addFork.send({ action: 'add' });
    }
}

function deleteItem() { 
    if (deleteFork && deleteFork.isConnected()) {
        deleteFork.send({ action: 'delete' });
    }
}

setInterval(addItem, 1000);