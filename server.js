const express = require('express');
const app = express();

// Serve Client Files
app.use(express.static('public/'));

// Start a server (Port 8080 by Default)
const port = process.env.PORT || 8080;
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port: ${port}`);
});

// Init socket io
const io = require('socket.io')(server);

// When a new client connects to our server
io.sockets.on('connection', socket => {
  console.log(`Client (id: ${socket.id}) connected.`);

  // When a client send click data
  socket.on('mouse', data => {
    console.log("Received: 'mouse' " + data.x + ' ' + data.y);

    // Send data to all other clients
    socket.broadcast.emit('mouse', data);
  });

  // When a client disconnects
  socket.on('disconnect', () => {
    console.log(`Client (id: ${socket.id}) disconnected.`);
  });
});
