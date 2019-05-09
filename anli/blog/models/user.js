/*
* @Author: jing
* @Date:   2019-04-09 22:35:03
* @Last Modified by:   jing
* @Last Modified time: 2019-04-09 22:50:33
*/
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
		username:{
			type:String
		},
		password:{
			type:String
		},
		isAdmin:{
			type:Boolean
		}
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;