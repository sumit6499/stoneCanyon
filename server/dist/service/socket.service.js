"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const initSocketService = () => {
    index_1.io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);
        socket.on('msg', (msg) => {
            console.log('message incoming');
            console.log(msg[msg.length - 1]);
            socket.emit('recieve-msg', {
                role: 'bot',
                content: 'hii',
            });
        });
        socket.on('disconnect', () => {
            console.log('socket disconnected');
        });
    });
};
exports.default = initSocketService;
//# sourceMappingURL=socket.service.js.map