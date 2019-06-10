/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 21:31:32
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var _cart = require('service/cart')
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
		this.$elem.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active')
			var imgUrl = $this.find('img').attr('src')
			$('.product-main-img').find('img').attr('src',imgUrl)
		})
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input');
			var current = parseInt($input.val());
			if($this.hasClass('plus')){
				$input.val(current + 1 >= _this.stock ? _this.stock : current + 1)
			}else if($this.hasClass('minus')){
				$input.val(current - 1 <= 1 ? 1 : current -1)
			}
		})
		this.$elem.on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.param.productId,
				count:$('.count-input').val()
			},function(){
				window.location.href = './result.html?type=addCart'
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})

	},
	loadProductDetail:function(){
		var _this = this;
		_product.getProductDetail(this.param,function(product){
			if(product){
				product.images = product.images.split(',');
				product.mainImg = product.images[0];
				_this.stock = product.stock;
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