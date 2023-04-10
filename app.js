const express = require('express');
const canvas = require('canvas');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
  const width = 50;
  const height = 50;

  const ponyColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  const canvasObj = canvas.createCanvas(width, height);
  const ctx = canvasObj.getContext('2d');

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = ponyColor;
  ctx.fillRect(10, 10, 30, 30);

  const imageData = canvasObj.toBuffer();
  res.set('Content-Type', 'image/png');
  res.send(imageData);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
