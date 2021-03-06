const express = require("express");
const upload = require('jquery-file-upload-middleware');
const bodyParser = require("body-parser");
const multer = require('multer');
const cloudinary = require('cloudinary');
// var morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const upload2 = multer(); 
const app = express();

// app.use(morgan())
var mongoose = require("mongoose");

const path = require('path');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload2.array());

app.use(session({ secret: "The SECRET key",
resave: true,
saveUninitialized: true }));

app.use(express.static(path.join(__dirname + '/public/assets/')));

app.use(bodyParser.urlencoded({ extended: false }));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/petcern";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', function(err) {
    console.log("Mongoose Error: ", err);
});

db.once('open', function() {
    console.log('Mongoose connection successful.');
});

app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSIONSECRET || 'pc',
    resave: false,
    saveUninitialized: true
}))

function userSetup(req, res, next) {
    if (!req.session.user) {
        req.session.user = {}
        req.session.user = {
            _id: null,
            first_name: '',
            last_name: '',
            email: ''
        }
        req.session.user.loggedIn = false;
        req.session.user.isAdmin = false;
    }
    next()
}

app.use(userSetup)
// Authentication and Authorization Middleware
var auth = function (req, res, next) {
    if (req.session.email === db.user.email) 
    return next();
    
    else
    return res.sendStatus(401);
};

//Get Home Page
// app.get('/', function (req, res, next) {
//     console.log("Server.js Session", req.session);
    
    
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, function () {
    console.log("Listening on Port: ", PORT)
});