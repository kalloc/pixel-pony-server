const express = require('express');
const crypto = require('crypto');

const app = express();

const ponySize = 50;

let sequenceNumber = 0;

function generatePonyImage() {
  const hash = crypto.createHash('md5').update(Math.random().toString()).digest('hex');
  const ponyColor = '#' + hash.slice(0, 6);
  const backgroundColor = '#' + hash.slice(6, 12);

  const svg = `
    <svg width="${ponySize}" height="${ponySize}" viewBox="0 0 ${ponySize} ${ponySize}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${ponySize}" height="${ponySize}" fill="${backgroundColor}" />
      <rect x="10" y="15" width="30" height="10" fill="${ponyColor}" />
      <rect x="5" y="25" width="40" height="10" fill="${ponyColor}" />
      <rect x="15" y="35" width="20" height="10" fill="${ponyColor}" />
      <rect x="0" y="45" width="50" height="5" fill="${ponyColor}" />
    </svg>
  `;

  return Buffer.from(svg);
}

app.get('/', (req, res) => {
  const numPonies = 1024;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Pixel Ponies</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #000;
          }
          .pony {
            width: ${ponySize}px;
            height: ${ponySize}px;
            display: inline-block;
            margin: 1px;
          }
        </style>
      </head>
      <body>
        ${Array(numPonies).fill().map(() => `
          <div class="pony">
            <img src="/pony/${sequenceNumber++}">
          </div>
        `).join('')}
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/pony/:sequenceNumber', (req, res) => {
  const imageData = generatePonyImage();
  res.set('Content-Type', 'image/svg+xml');
  res.send(imageData);
});

module.exports = app;
