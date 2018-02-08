const HOST = 'http://localhost:8080';
let socket;

function setup() {
  // Make a canvas, with a bg
  createCanvas(900, 800);
  background('#5d707f');
  // Connect to our socket server
  socket = io.connect(HOST);
  // When we recieve mouse data from the server, draw it!
  socket.on('mouse', data => {
    fill('#03A9FC');
    noStroke();
    ellipse(data.x, data.y, 20, 20);
  });
}

function draw() {
  // We don't need to use this because the sockets are drawing for us
}

function mouseDragged() {
  // Make a circle when we click
  fill('#ed225d');
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);
  // Send our action to the socket server
  sendmouse(mouseX, mouseY);
}

function sendmouse(xpos, ypos) {
  // Sends our mouse data in an { x: , y: } object
  socket.emit('mouse', {
    x: xpos,
    y: ypos
  });
}
