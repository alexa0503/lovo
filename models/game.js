var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var GameSchema = mongoose.Schema({
	sid: String,
	joinId: String,
	createdAt: { type: Date, default: Date.now },
    ipAddress: String,
	status: { type: Number, default:0 }
});

GameSchema.plugin(mongoosePaginate);
var GameModel = mongoose.model('t_game', GameSchema);
module.exports = GameModel;
