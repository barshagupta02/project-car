
const express = require('express');
const app = express();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: 'public_cwepqBJhS9FlX99mg0JkYpd5oug=',
    privateKey: 'private_XBN5Cyk9Xaf1vluUyiKxOzcqp5k=',
    urlEndpoint: 'https://ik.imagekit.io/slzjfy0o4g'
});

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(3002, function () {
  console.log('Live at Port 3002');
});