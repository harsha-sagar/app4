var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var itemsRouter = require('./routes/items');
var Item = require('./models/item');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

var port = 5000;
app.listen(port, function(err){
    console.log('running server on port: '+port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dbName = 'itemDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);

app.use('/items', itemsRouter);
