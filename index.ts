import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', (socket: socketIO.Socket) => {
    socket.on('chat message', (msg: string) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
