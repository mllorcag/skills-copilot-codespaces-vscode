// Create web server
// Run: node comments.js
// Test: curl -i http://localhost:3000/comments
// Test: curl -i http://localhost:3000/comments/1
// Test: curl -i http://localhost:3000/comments/2
// Test: curl -i -X POST -d "text=hello" http://localhost:3000/comments
// Test: curl -i -X PUT -d "text=hi" http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = __dirname + '/comments.json';

// Set port
app.set('port', (process.env.PORT || 3000));

// Set static folder
app.use('/', express.static(__dirname + '/'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CORS headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.get('/', function(req, res) {
  res.render('index.html');
});

// GET comments
app.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// POST comments
app.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if(err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),