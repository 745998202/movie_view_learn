var express = require('express');
//路由引入
var router = express.Router();
//数据库引入
var mongoose = require('mongoose');
//定义路由
var recommend = require("../models/recommend");
var movie = require("../models/movie");
//var article = require("../models/article");
//var user =  require("../models/user");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Mongoose 测试
router.get('/mongooseTest',function(req,res,next){
  mongoose.connect('mongodb://localhost/pets',{useMongoClient:true});
  mongoose.Promise = global.Promise;

  var Cat = mongoose.model('Cat',{name : String});

  var tom = new Cat({name : 'Tom'});
  
  tom.save(function(err){
    if(err){
      console.log(err);
    }else{
      console.log('success insert')
    }
  });
  res.send('数据库连接测试')
});

// 显示主页的推荐大图
router.get("/showIndex",function(req,res,next){
  recommend.findAll(function(err,getRecommend){
    res.json({status: 0, message: "获取推荐",data: getRecommend})
  })
});

// 显示所有的排行榜，也就是对于电影字段index的样式
router.get('/showRanking',function(req,res,next){

});
// 显示文章列表
router.get("showArticle",function(req,res,next){

});
// 显示文章内容
router.post("/articleDetail",function(req,res,next){

});
// 显示用户个人信息的内容
router.post("/showUser",function(req,res,next){

});

module.exports = router;
