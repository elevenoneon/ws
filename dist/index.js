"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = (0, socket_io_1.default)(server);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/index.html'));
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
