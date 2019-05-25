/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-22 10:09:47
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
var _side = require('page/common/side')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.onload()
		this.loadUserInfo()
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(user){
			var html = _util.render(tpl,{
				user
			})
			$('.side-content').html(html)
		})
	}
	
}
$(function(){
	page.init()
})