const express = require('express');
const methodOverride = require('method-override');
const app = express();
const morgan = require('morgan');
const port = 8500;
const host = '127.0.0.1';

var breedRouter = require('./breeds');

app.use(morgan('dev'));
app.use(express.static('client'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/breeds', breedRouter);

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// app.use(methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       // look in urlencoded POST bodies and delete it
//       var method = req.body._method
//       delete req.body._method
//       return method
//     }
// }))




app.use((err, req, res, next) =>{
    if(err){
        console.log(err.message);
        res.status(500), send(err);
    }
})

//https://github.com/lmichelletech/midterm
//app.listen(3000, '127.0.0.1');
app.listen(port, host, function(){
    
        console.log('Listening on http://localhost:', port);
    
})
