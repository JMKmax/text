/*
* @Author: macnookpro
* @Date:   2019-05-20 13:51:31
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-21 12:23:05
*/
require('./index.css')
var _util = require('util')
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//用户注册
		$('#btn-search').on('click',function(){
			_this.submitSearch()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitSearch()
			}
		})
	},
	submitSearch:function(){
		var keyWord = $('.search-input').val()
		window.location.href = './list.html?keyword='+keyWord;
	}
	
}
$(function(){
	page.init()
})