/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-21 22:16:31
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
var _side = require('page/common/side')
require('./index.css')
var _util = require('util')
var _user = require('service/user')

var page = {
	init:function(){
		this.onload()
	},
	onload:function(){
		_side.render('order-list')
	},
	
	
}
$(function(){
	page.init()
})