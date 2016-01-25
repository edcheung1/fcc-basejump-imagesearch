'use strict'

var appID = 'Qu4s8xr1dl/1b8ZxSfaX0d9HYFgxs1lkNrXYdtE2p/E';
var Bing = require('node-bing-api')({accKey: appID});

module.exports = function(app, db) {
    var imgCollect = db.collection('imgCollect');
    
    app.route('/')
      .get(function (req, res) {
        res.send('Hello World! asdfsaf');
      });
    
    app.route('/api/imagesearch/:offset')
        .get(function (req, res) {
            console.log(req.params.offset);
            console.log(req.query.offset);
            Bing.images(req.params.offset, {top: 10, skip: req.query.offset}, function (err, response, body) {
                if(err) {
                    throw err;
                }
                var allRes = [];
                
                body.d.results.forEach(function(result) {
                    var currRes = {};
                    currRes.url = result.MediaUrl;
                    currRes.snippet = result.Title;
                    currRes.thumbnail = result.Thumbnail.MediaUrl;
                    currRes.context = result.SourceUrl;
                    allRes.push(currRes);
                });
                
                res.send(allRes);
            });
        });
        
    app.route('/api/latest/imagesearch')
        .get(function (req, res) {
            
            
            
        })
    
};