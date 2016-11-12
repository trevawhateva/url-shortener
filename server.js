var express = require('express');
var app = express();
var path = require('path');
var validUrl = require('valid-url');
var mongoose = require('mongoose');
var Url = require('./models/url.js');
var port = process.env.PORT || 8080;

//mongoose.connect('mongodb://trevolution-camper-api-project-3935373:27017');
mongoose.connect('mongodb://heroku_qpff8krb:uctju536aua5rphd2900qd2cnj@ds151697.mlab.com:51697/heroku_qpff8krb');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/new/:url(*)', function(req,res){
    var requestedUrl = req.params.url;
    // first, validate the url
    if(validUrl.isWebUri(requestedUrl)) {
        // check if url already exists in db, if so, send json with response
        Url.find({ url: requestedUrl }, function(err, url){
            if (err) console.log(err);
            if (url.length > 0) {
                res.send({"original_url": url[0].url, "short_url": "https://td-url-shortener.herokuapp.com/" + url[0].id});
            } else {
                // if it does not exist, create it and return json with response
                var newUrl = Url({
                    url: requestedUrl
                });
                newUrl.save(function(err,url){
                    if (err) console.log(err);
                    res.send({"original_url": url.url, "short_url": "https://td-url-shortener.herokuapp.com/" + url.id});
                });
            }
        });
    } else {
        res.json({"error": "You did not enter a valid URL"});
    }
});

app.get('/:short', function(req,res){
    if(isNaN(req.params.short)) {
        res.send("You entered an invalid URL");
    } else {
        Url.find({ id: req.params.short }, function(err,short){
            if (err) console.log(err);
            if (short.length > 0) {
                res.redirect(short[0].url);
            } else {
                res.send("URL not found");
            }
        });
    }
});

app.listen(port, function(){
    console.log('Radical!');
})