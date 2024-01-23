const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connect', (socket) => {
  console.log('a user connected to session ' + socket.id);
  socket.on("message", msg => {
    console.log("received message from app")
    socket.emit("response from server", "hello there --- your message is " + msg + " from sessionid " + socket.id)
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

