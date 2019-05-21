/*
* @Author: macnookpro
* @Date:   2019-05-20 14:55:42
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-21 08:13:23
*/
var _util = require('util')
var _user = {
	logout:function(success,error){
		_util.requst({
			url:'/user/logout',
			success:success,
			error:error
		})
	},
	login:function(data,success,error){
		_util.requst({
			method:'post',
			url:'/user/login',
			data:data,
			success:success,
			error:error
		})
	},
	register:function(data,success,error){
		_util.requst({
			method:'post',
			url:'/user/register',
			data:data,
			success:success,
			error:error
		})
	},
	getUserName:function(success,error){
		_util.requst({
			url:'/user/username',
			success:success,
			error:error
		})
	},
	checkUsername:function(username,success,error){
		_util.requst({
			url:'/user/checkUsername',
			data:{
				username:username
			},
			success:success,
			error:error
		})
	}
}
module.exports = _user