/*
* @Author: macnookpro
* @Date:   2019-05-20 13:51:31
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 18:05:29
*/
require('./index.css')
var _user = require('service/user')
var _cart = require('service/cart')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserName();
		this.loadCartCount();
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
	},
	loadCartCount:function(){
		_cart.getCartCount(function(count){
			$('.nav-list .cart-num').text(count || 0)
		},function(){
			$('.nav-list .cart-num').text( 0)
		})
	}
}
module.exports = nav.init()