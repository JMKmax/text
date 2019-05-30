/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-26 10:32:56
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
	param:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init:function(){
		this.$elem = $('.detail-box');
		this.onload()
		this.bindEvent()
	},
	onload:function(){
		if(this.param.productId){
			this.loadProductDetail()
		}
	},
	bindEvent:function(){
		var _this = this;
	},
	loadProductDetail:function(){
		var _this = this;
		_product.getProductDetail(this.param,function(product){
			if(product){
				product.images = product.images.split(',');
				product.mainImg = product.images[0]
				var html = _util.render(tpl,product)
				_this.$elem.html(html)
			}
		},function(){
			_this.$elem.html('<p class="empty-msg">搜索不到此商品</p>')
		})
	}
	
}
$(function(){
	page.init()
})