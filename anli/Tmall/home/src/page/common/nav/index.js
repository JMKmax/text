/*
* @Author: macnookpro
* @Date:   2019-05-20 13:51:31
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-20 19:23:01
*/
require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserName()
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				// console.log(result)
				window.location.reload()
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadUserName:function(){
		_user.getUserName(function(data){
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(data.username)
		})
	}
}
module.exports = nav.init()