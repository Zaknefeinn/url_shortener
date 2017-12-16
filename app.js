var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var regURL = '';
var shortURL = '';
var ranNum;
var checker = '';
MongoClient.connect('mongodb://Zaknefeinn:1234asdf@ds229415.mlab.com:29415/url_shortener');


app.use('/new', function(req, res, next) { 
     ranNum = getRandomIntInclusive(1000,9999);
     regURL = req.path.substr(1);
     shortURL = req.protocol  + '://' + req.headers.host + '/' + ranNum;
  next();
});

app.get('/', function(req, res){
    res.send('normal page');
});

app.get('/new/*', function(req,res){
if (regURL.startsWith("http://") || regURL.startsWith("https://" )){
    var data = { original_url: regURL,
    short_url: shortURL };
    checker = shortURL.substr(shortURL.length - 4);
    res.send(data);
    } else {
        res.send({error: "Wrong url format, make sure you have a valid protocol and real site."});
    }
});

app.get('/:param1', function(req,res){
    if(JSON.stringify(req.path.substr(1)) === JSON.stringify(checker)){
        res.redirect(regURL);
    } else {
        res.send({
error: "This url is not on the database."
})
    }
});



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

app.listen(process.env.PORT,process.env.IP, function(){
    console.log('url shortener running!');
});