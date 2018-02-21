const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const port = process.env.PORT || 5000;

// Create Express webapp
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

// Create http server and run it
const server = http.createServer(app);

server.listen(port, function() {
  console.log('Express server running on *:' + port);
});