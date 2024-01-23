const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const jwtDecode = require("jwt-decode").jwtDecode;
const cacheService = require("./caching/cacheService").cachingService

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
  socket.on("register-client", registrationMsg => {
    console.log("received a registration request of data")
    cacheService.registerSessionToCache(socket.id, {token: registrationMsg.token})
    socket.emit("register-server", "hello there --- your message is " + registrationMsg + " from sessionid " + socket.id)
  })
  socket.on("private-message", msgRequest => {
    const sendTo = cacheService.getSessionIdByUserEmail(msgRequest.to)
    console.log(`received private-message to ${msgRequest.to} with content: ${msgRequest.message} and sessionId: ${sendTo}`)
    socket.to(sendTo).emit("private-message-from-server", {from: jwtDecode(msgRequest.token), message: msgRequest.message})
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

