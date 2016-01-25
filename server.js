'use strict'

var express = require('express');

var app = express();

var appID = 'Qu4s8xr1dl/1b8ZxSfaX0d9HYFgxs1lkNrXYdtE2p/E';

app.route('/')
  .get(function (req, res) {
    res.send('Hello World!');
  });

app.listen(8080, function () {
        console.log('Listening on port 8080...');
    });