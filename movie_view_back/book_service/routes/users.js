var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
// var movie = require('../models/movie');
// var mail = require('../models/mail');
// var comment = require('../models/comment');
// const init_token = 'TKL02o';
/* GET users listing. */
//用户登录接口
router.post('/login',function(req,res,next){
    if(!req.body.username){
        res.json({status:1,message:"用户名为空"})
    }
    if(!req.body.password){
        res.json({status:1,message:"用户密码为空"})
    }
    user.findUserLogin(req.body.username,req.body.password,function(err,userSave){
        if(userSave.length != 0){
            // 通过MD5查看密码
            var token_after = getMD5Password(userSave[0]._id);
            res.json({status:0,data:{token:token_after,user:userSave},message:"用户登录成功"})
        }else{
            res.json({status:1,message:"用户名或密码错误"})
        }
    })
});

// 用户注册接口
router.post('/register',function(req,res,next){
    if(!req.body.username){
        res .json({status:1,message:"用户名为空"})
    }

    if(!req.body.password){
        res.json({status:1,message:"密码为空"})
    }

    if(!req.body.userMail){
        res.json({status:1,message:"用户邮箱为空"})
    }

    if(!req.body.userPhone){
        res.json({status,message:"用户手机为空"})
    }

    user.findByUsername(req.body.username,function(err,userSave){
        if(userSave.length != 0){
            //返回错误信息
            res.json({status:1,message:"用户已注册"})
        }else{
            var registerUser = new user({
                username:req.body.username,
                password:req.body.password,
                userMail:req.body.userMail,
                userPhone:req.body.userPhone,
                userAdmin:0,
                userPower:0,
                userStop:0
            })
            registerUser.save(function(){
                res.json({status:0,message:"注册成功"})
            })
        }
    })
});
// 用户提交评论
router.post('/postComment',function(req,res,next){

});
// 用户点赞
router.post('/support',function(req,res,next){

});
// 用户找回密码
router.post('/findPassword',function(req,res,next){
    // 需要输入用户的邮箱信息和手机信息，同时可以更新密码
    // 这里需要返回两个情况，一个是req.body.repassword存在时，另一个是repassword不存在时
    // 这个接口同时用于密码的重置,需要用户登录
    if(req.body.repassword){
        //当存在时，需要验证其登录情况或者验证其code
        if(!req.body.user_id){
            res.json({status:1,message:"用户登录错误"})
        }

        if(!req.body.password){
            res.json({status:1,message:"用户老密码错误"})
        }
        //获取token
        if(req.body.token == getMD5Password(req.body.user_id)){
            user.findOne({_id:req.body.user_id,password:req.body.password},function(err,checkUser){
                if(checkUser){
                    user.update({_id:req.body.user_id},{password:req.body.repassword})
                }
            })
        }
    }
});
// 用户发送站内信
router.post('/sendEmail',function(req,res,next){

});
// 用户显示站内信
router.post('/showEmail',function(req,res,next){

});
// 获取MD5值
function getMD5Password(id){
    var md5 = crypto.createHash('md5');
    var token_before = id + "token";
    // res.json(userSave[0]._id)
    return md5.update(token_before).digest('hex')
}
module.exports = router;
