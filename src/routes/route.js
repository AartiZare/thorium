const express = require('express');
const router = express.Router();

router.get("/movie-list", function(req, res)
{
    res.send(["Suryavanshi", "Welcome", "Happy new year", "Happy Ending", "Pardes"])
})

router.get('/movies', function(req, res){
    let movies = req.body;
    console.log(movie)
    res.send(movie)
})

router.get('/movies/:moviesid',function(req, res){
    let moviesid = 1
    let movie = req.body
    let validrequest = req.params.moviesid
    for(let i=0; i<movie.length; i++){
        if(movie[i].id>validrequest){
            res.send("id:'1',name:'the Shining'", movie)
        }else{
            res.send("Proide valid usrtId")
        }
    }
    res.send(movie)

})
 module.exports = router;