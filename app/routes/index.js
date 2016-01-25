'use strict'

var appID = 'Qu4s8xr1dl/1b8ZxSfaX0d9HYFgxs1lkNrXYdtE2p/E';
var Bing = require('node-bing-api')({accKey: appID});

module.exports = function(app, db) {
    var imgCollect = db.collection('imgCollect');
    
    app.route('/')
      .get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
      });
    
    app.route('/api/imagesearch/:offset')
        .get(function (req, res) {
            var query = req.params.offset;
            var offset = req.query.offset || 0;
            console.log(offset);
            Bing.images(query, {top: 10, skip: offset}, function (err, response, body) {
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
                console.log(getTimestamp());
                
                imgCollect.insertOne({term: query, when: getTimestamp()});
                
                res.send(allRes);
            });
        });
        
    app.route('/api/latest/imagesearch')
        .get(function (req, res) {
            imgCollect.find({}, {_id: 0}).sort({when: -1}).limit(10).toArray(function (err, docs) {
                if (err) {
                       throw err;
                   }
                   
                   if (docs) {
                       res.send(docs);
                   }
            });
            
            
        })
    
};

function getTimestamp() {
    var t = new Date();
    
    return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
    
}