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
    if(validUrl.isWebUri(req.params.url)) {
        res.json({'original_url': req.params.url});
    } else {
        res.json({"error": "You did not enter a valid URL"})
    }
});

app.listen(8080, function(){
    console.log('Radical!');
})