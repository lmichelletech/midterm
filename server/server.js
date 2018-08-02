var express = require('express');
var app = express();
var morgan = require('morgan');
var port = 8500;
var host = '127.0.0.1';

var breedRouter = require('./breeds');






app.use(morgan('dev'));
app.use(express.static('client'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/breeds', breedRouter);

app.use((err, req, res, next) =>{
    if(err){
        console.log(err.message);
        res.status(500), send(err);
    }
})

app.listen(port, host, function(){
    
        console.log('Listening on http://localhost:', port);
    
})