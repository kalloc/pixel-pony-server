const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const port = 3000;

app.get('/pony', (req, res) => {
  // create a new canvas
  const width = 100;
  const height = 100;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // randomize the pony's color
  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;

  // draw the pony
  ctx.fillRect(10, 10, 80, 80);

  // randomize the position and size of the pony's ears
  const earHeight = Math.floor(Math.random() * 40) + 10;
  const earWidth = Math.floor(Math.random() * 20) + 10;
  ctx.fillRect(20, 0, earWidth, earHeight);
  ctx.fillRect(60, 0, earWidth, earHeight);

  // randomize the position and size of the pony's eyes
  const eyeSize = Math.floor(Math.random() * 10) + 5;
  ctx.fillStyle = 'white';
  ctx.fillRect(20, 20, eyeSize, eyeSize);
  ctx.fillRect(60, 20, eyeSize, eyeSize);
  ctx.fillStyle = 'black';
  ctx.fillRect(25, 25, eyeSize - 5, eyeSize - 5);
  ctx.fillRect(65, 25, eyeSize - 5, eyeSize - 5);

  // randomize the position of the pony's nose and mouth
  const noseX = Math.floor(Math.random() * 40) + 30;
  const mouthY = Math.floor(Math.random() * 20) + 60;
  ctx.fillRect(noseX, 50, 40, 20);
  ctx.fillRect(noseX, mouthY, 10, 10);
  ctx.fillRect(noseX + 30, mouthY, 10, 10);

  // stream the image directly to the response object
  const buffer = canvas.toBuffer('image/png');
  const stream = canvas.createPNGStream();
  res.set('Content-Type', 'image/png');
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
