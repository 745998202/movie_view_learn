var mongoose = require('../common/db');

var movie = new mongoose.Schema({
    movieName: String,
    movieImg: String,
    movieVideo: String,
    movieDownload: String,
    movieTime: String,
    movieNumSuppose: Number,
    movieNumDownload: Number,
    movieMainPage: Boolean,
});
movie.statics.findById = function(id,callBack){
    this.findOne({_id:id},callBack);
};
movie.statics.findAll = function(callBack){
    this.find({},callBack);
};
var movieModel = mongoose.model("movie",movie)
module.exports = movieModel

