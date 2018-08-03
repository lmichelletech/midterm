const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 8500;
const host = '127.0.0.1';
var path = require('path');

var breedRouter = require('./breeds');

app.use(morgan('dev'));
app.use(express.static('client'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/breeds', breedRouter);

app.use('/edit', function(req, res) {
    res.redirect('/editbreed.html');
})



app.use((err, req, res, next) =>{
    if(err){
        console.log(err.message);
        res.status(500), res.send(err);
    }
})

//https://github.com/lmichelletech/midterm
//app.listen(3000, '127.0.0.1');
app.listen(port, host, function(){
    
        console.log('Listening on http://localhost:', port);
    
})
