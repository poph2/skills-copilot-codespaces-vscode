// Create web server
// Open browser to http://localhost:8080/
// Refresh browser to see the message change
// Kill server with CTRL+C
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

// Configure app for bodyParser()
// Lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 8080;

// API Routes
var router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// MIDDLEWARE -
// Middleware can be very useful for doing validations. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
router.use(function(req, res, next) {
    // Do logging
    console.log('FYI...There is some processing currently going down...');
    next();
});

// Test Route
router.get('/', function(req, res) {
    res.json({message: 'Welcome to our API!'});
});

router.route('/comments')
    // create a comment (accessed at POST http://localhost:8080/api/comments)
    .post(function(req, res) {
        var comment = new Comment(); // create a new instance of the Comment model
        comment.comment = req.body.comment; // set the comment (comes from the request)
        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Comment successfully added!'});
        });
    })
    // get all the comments (accessed at GET http://localhost:8080/api/comments)
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
    });

router.route('/comments/:comment_id')
    // get the comment with that id
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    })
    // update the comment with this id