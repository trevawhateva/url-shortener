var express = require('express');
var app = express();
var path = require('path');
var validUrl = require('valid-url');
var mongoose = require('mongoose');
var Url = require('./models/url.js');

mongoose.connect('mongodb://trevolution-camper-api-project-3935373:27017');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/new/:url(*)', function(req,res){
    // first, validate the url
    if(validUrl.isWebUri(req.params.url)) {
        // check if url already exists in db, if so, send json with response
        Url.find({ url: req.params.url }, function(err, url){
            if (err) console.log(err);
            if (url.length > 0) {
                res.json(url);
            } else {
                var newUrl = Url({
                    url: req.params.url
                });
                newUrl.save(function(err){
                    if (err) console.log(err);
                });
            }
        });
        // if it does not exist, create it and return json with response
        
    } else {
        res.json({"error": "You did not enter a valid URL"});
    }
});

app.get('/:short', function(req,res){
    if(isNaN(req.params.short)) {
        res.send("You entered an invalid URL");
    }
});

app.listen(8080, function(){
    console.log('Radical!');
})