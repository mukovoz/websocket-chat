import {WebSocketServer} from "ws";

const port = 5000;

const webSocketServer = new WebSocketServer({
    port
});

/**
 * Here we will save all connections from client
 * @type {*[]}
 */
let connections = [];

/**
 * Here we will save list of all messages
 * @TODO: replicate them to Database as well
 * @type {*[]}
 */
let messages = [];

const onNewMessage = (message) => {
    console.log('New Message Received', message.text);

    messages.push(message);
    connections.filter(connection => connection.state !== 'closed').map(
        connection => connection.send(JSON.stringify([message]))
    );
}


webSocketServer.on('connection', socket => {
    socket.on('error', console.error);
    connections.push(socket);

    socket.on('message', message => onNewMessage(JSON.parse(message.toString())));

    /**
     * After client is connected we have to send 10 latest messages
     */
    socket.send(JSON.stringify(messages.slice(messages.length - 10)));

    console.log(`New client connected - ${connections.length}`);
});

console.log(`Server started on port ${port}`);

/**
 * @todo: Implement disconnect
 * @todo: handle failures... etc
 */