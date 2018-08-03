var path = require('path');
var breedRouter = require('express').Router();
var breeds = [{
    'id': 1,
    'breedtype': 'Akita',
    'origin': 'Japan',
    'image': 'http://cdn2-www.dogtime.com/assets/uploads/2011/01/file_22906_akita-460x290.jpg',
    'size': 'Large'
},{
    'id': 2,
    'breedtype': 'Chihuahua',
    'origin': 'Mexico',
    'image': 'https://www.gettyimages.com/detail/photo/chihuahua-sniffing-food-studio-grey-high-res-stock-photography/164287802',
    'size': 'Small'
}];

var id = 2;

var updateId = function(req, res, next){
    if(!req.body.id){
        id++;
        req.body.id = id + '';
    }

    next();
}


breedRouter.param('id', (req, res, next, id) =>{
    var breed = breeds.find(breed => {
        return breed.id == id;
    })

    if(breed){
        req.breed = breed;
        next();
    }
    else{
        res.send();
    }
})

breedRouter.get('/', (req, res) =>{
    res.json(breeds); 
})

breedRouter.get('/:id', (req, res) => {
    var breed = req.breed;

    res.json(breed || {});
});

breedRouter.get('/type/:id', (req, res) => {
    var breedtype = req.params.id;
    console.log('breedtype ' + breedtype);

    var breed = breeds.findIndex(breed => breed.id == breedtype);

    console.log("findindex delete id " + breed);
    if(!breeds[breed]){
        res.json("There is no record for that breedtype.");
    }else{
        res.redirect('/editbreed.html', { breed : breeds[breed]});
    }
});


// must cast id to convert to string
breedRouter.post('/', updateId, (req, res) => {
    var breed = req.body;

    breeds.push(breed);
    res.json(breed);
});


breedRouter.get('/editbreed/:id', (req, res) => {
    var id = req.params.id;
    var update = req.body;
    console.log("update " + update.id);
    if(update.id){
        delete update.id;
    }

    var breed = breeds.findIndex(breed => breed.id == id);
    if(!breeds[breed]){
        res.send();
    }
    else{
        var updateBreed = Object.assign(breeds[breed], update);
        res.json(updateBreed);
    } 
});


breedRouter.post('/editbreed', (req, res) => {
    var update = req.body;
    // console.log("update " + update.id);
    // if(update.id){
    //     delete update.id;
    // }

    var breed = breeds.findIndex(breed => breed.id == req.body.id);
    // console.log("---> breed " + breed + " body " + req.body.id);
    if(!breeds[breed]){
        res.send();
    }
    else{
        var updateBreed = Object.assign(breeds[breed], update);
        res.json(updateBreed);
    } 
})

breedRouter.post('/edit/:id', (req, res) => {
    var update = req.body;
    if(update.id){
        delete update.id;
    }

    var breed = breeds.findIndex(breed => breed.id == req.params.id);
    if(!breeds[breed]){
        res.send();
    }
    else{
        var updateBreed = Object.assign(breeds[breed], update);
        res.json(updateBreed);
    }
})

breedRouter.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    console.log("delete id " + req.params.id);

    var breed = breeds.findIndex(breed => breed.id == req.params.id);
    console.log("findindex delete id " + breed);
    if(!breeds[breed]){
        res.send("Delete failed. There is no record with that id for me to delete.");
    }else{
        var deleteBreed = breeds[breed];
        breeds.splice(breed, 1);
        res.json(breeds);
    }
})



module.exports = breedRouter;