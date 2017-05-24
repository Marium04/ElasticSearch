/**
 * Created by mariumaskri on 2017-04-17.
 */
const express = require('express');
const path = require("path");
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const searchAPi = require('../server/searchApi');
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/search',searchAPi);
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));


// Catch all other routes and return the index file
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen(process.env.PORT || 5050, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});




module.exports = app;
