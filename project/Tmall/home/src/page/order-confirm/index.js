/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 23:12:24
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')

require('./index.css')
var _util = require('util')
var _order = require('service/order')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box');
		this.$productBox = $('.product-box')
		this.onload();
		this.bindEvent()
	},
	onload:function(){
		this.loadShipping();
		this.loadProduct();
	},
	
	bindEvent:function(){
		var _this = this;
		
	},
	loadShipping:function(){
		var html = _util.render(shippingTpl);
		this.$shippingBox.html(html)
	},
	loadProduct:function(){
		var _this = this
		_order.getOrderProductList(function(result){
			console.log(result)
			if(result.cartList.length >= 0){
			//处理图片
				result.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0]
				})
				var html = _util.render(productTpl,result);
				_this.$productBox.html(html)
			}else{
				_this.$productBox.html('<p class="empty-msg">购物车没有选择商品!!!</p>')
			}
		},function(msg){
			_util.showErrorMsg(msg)
		})
		
		
	}
	
}
$(function(){
	page.init()
})