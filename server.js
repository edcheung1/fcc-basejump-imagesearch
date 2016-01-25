'use strict'

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://heroku_76c7rxjn:25fg9ffd042clbdvq84e339rnj@ds049935.mongolab.com:49935/heroku_76c7rxjn', function (err, db) {
    if (err) {
        throw new Error('Database failed to connect.');
    } else {
        console.log('MongoDB successfully connected on port 27017.')
    }
    
    routes(app, db);

    app.listen(8080, function () {
        console.log('Listening on port 8080...');
    });
    
})