var express = require('express');
var router = express.Router();
var user = require('../models/user')
var movie = require('../models/movie')




//---路由设计---

// 添加电影
router.post('/movieAdd',function(req,res,next){
    if(!req.body.username){
        res.json({status:1,message:"用户名为空"})
    }
    if(!req.body.token){
        res.json({status:1,message:"登录出错"})
    }
    if(!req.body.id){
        res.json({status:1,message:"用户传递错误"})
    }
    if(!req.body.movieName){
        res.json({status:1,message:"电影名称为空"})
    }
    if(!req.body.movieImg){
        res.json({status:1,message:"电影图片为空"})
    }
    if(!req.body.movieDownload){
        res.json({status:1,message:"电影下载地址为空"})
    }

    if(!req.body.movieMainPage){
        var movieMainPage = false
    }

    //验证
    //var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
    var check = {
        error : 0
    }
    if(check.error == 0){
        //验证用户的情况
        user.findByUsername(req.body.username,function(err,findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                //根据数据集建立需要存入数据库的内容
                var saveMovie = new movie({
                    movieName : req.body.movieName,
                    movieImg : req.body.movieImg,
                    movieVideo : req.body.movieVideo,
                    movieDownload : req.body.movieDownload,
                    movieTime : Date.now(),
                    movieNumSuppose : 0,
                    movieNumDownload : 0,
                    movieMainPage : movieMainPage,
                })

                saveMovie.save(function(err){
                    if(err){
                        res.json({status: 1,message: err})
                    }else{
                        res.json({status:0,message:"添加成功"})
                    }
                })
            }else{
                res.json({status:1,message:"用户没有获得权限或者权限已经停用"})
            }
        })
    }else{
        res.json({status:1,message:check.message})
    }
});

// 删除电影
router.post('movieDel',function(req,res,next){
    if(!req.body.movieId){
        res.json({status:1,message:"电影id传递失败"})
    }
    if(!req.body.username){
        res.json({status:1,message:"用户名为空"})
    }
    if(!req.body.token){
        res.json({status:1,message:"登录出错"})
    }
    if(!req.body.id){
        res.json({status:1,message:"用户传递错误"})
    }

    var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
    if(check.error = 0){
        user.findByUsername(req.body.username,function(err,findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                movie.remove({_id: req.body.movieId},function(err,delMovie){
                    res.json({status:0,message:"删除成功",data:delMovie})
                })
            }else{
                res.json({error:1,message:"用户没有获得权限或者已经停用"})
            }
        })
    }else{
        res.json({status:1,message:check.message})
    }
});

// // 更新电影
router.post('movieUpdate',function(req,res,next){
    if(!req.body.movieId){
        res.json({status:1,message:"电影id传递失败"})
    }
    if(!req.body.username){
        res.json({status:1,message:"用户名为空"})
    }
    if(!req.body.token){
        res.json({status:1,message:"登录出错"})
    }
    if(!req.body.id){
        res.json({status:1,message:"用户传递错误"})
    }

    // 这里在前台打包一个电影对象全部发送至后台直接存储
    var saveData = req.body.movieInfo
    //验证
    var check = checkAdminPower(req.body.username,req.body.token,req.body.id)

    if(check.error == 0){
        user.findByUsername(req.body.username,function(err,findUser){
            if(findUser[0].userAdmin && !findUser[0].userStop){
                // 更新操作
                movie.update({_id:req.body.movieId},saveData,function(err,delMovie){
                    res.json({status:0,message:"删除成功"})
                })
            }else{
                res.json({error:1,message:"用户没有获得权限或已停用"})
            }
        })
    }else{
        res.json({status:1,message:check.message})
    }
});
// // 获取所有电影
router.get('/movie',function(req,res,next){
    movie.findAll(function(err,allMovie){
        res.json({status:0,message:'获取成功',data:allMovie})
    })
}); 
// // 获取用户评论
// router.post('movieDel',function(req,res,next){

// });
// // 审核用户评论
// router.post('movieDel',function(req,res,next){

// });
// // 删除用户评论
// router.post('movieDel',function(req,res,next){

// });
// // 封停用户
// router.post('movieDel',function(req,res,next){

// });
// // 更新用户密码
// router.post('movieDel',function(req,res,next){

// });
// // 显示所有用户
// router.post('movieDel',function(req,res,next){

// });
// // 管理用户权限
// router.post('movieDel',function(req,res,next){

// });
// // 新增文章
// router.post('movieDel',function(req,res,next){

// });
// // 删除文章
// router.post('movieDel',function(req,res,next){

// });
// // 新增主页推荐
// router.post('movieDel',function(req,res,next){

// });
// // 删除热点信息
// router.post('movieDel',function(req,res,next){

// });

module.exports = router;
