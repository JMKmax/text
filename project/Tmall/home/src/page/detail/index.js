/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-25 20:53:33
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')
var page = {
	listParam:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init:function(){
		this.$elem = $('.detail-box');
		this.onload()
		this.bindEvent()
	},
	onload:function(){
		
	},
	bindEvent:function(){
		
	},
	
}
$(function(){
	page.init()
})