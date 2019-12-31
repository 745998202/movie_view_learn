var express = require('express');
var router = express.Router();
var movie = require('../models/movie');

router.post('/buildMovie',function(req,res,next){
    if(!req.body.movieName){
        res.json({status:0,message:"电影名不能为空"})
    }

    var mov = new movie({
        movieName : req.body.movieName,
        movieImg : "xxx",
        movieVideo : "xxx",
        movieDownload : "xxx",
        movieTime : "xxx",
        movieNumSuppose: 0,
        movieNumDownload: 0,
        movieMainPage:false,
    })

    mov.save(function(err){
        if(err){
            res.json({status:0,message:err})
        }else{
            res.json({status:1,message:"电影创建成功！"})
        }
    });
});


module.exports = router;