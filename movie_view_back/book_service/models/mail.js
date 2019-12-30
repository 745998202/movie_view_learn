var mongoose = require('../common/db');

var mail = new mongoose.Schema({
    fromUser : String,
    toUser : String,
    title : String,
    context : String
})

mail.static.findByToUserId = function(user_id,callBack){
    this.find({toUser: user_id},this.callBack);
};

mail.statics.findByFromUserId = function(user_id,callBack){
    this.find({fromUser: user_id},callBack);
};

var mailModel = mongoose.model('mail',mail);

module.exports = mailModel
