/**
 * Created by Christianson on 12/08/2015.
 */
var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    formidable = require('formidable'),
    bodyParser = require('body-parser'),
    router = require('./routes/routes');


var app = express();

app.use(function(req,res,next){
    console.log(req.path);
    next();
});
app.get('/users', function(req,res,next){
    mongoose.model('users').find(function(err, users){
       res.send(users);
    });
});

/*app.use(morgan('combined'));*/
app.set('views', path.join(__dirname,"views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', router.testFunction(formidable));


app.listen(3000, function(){
   console.log("Started on Port 3000");
});