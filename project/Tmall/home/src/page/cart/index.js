/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 21:46:57
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var _cart = require('service/cart')
var _nav = require('page/common/nav')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.$elem = $('.cart-box');
		this.totalCartPrice = 0;
		this.loadCart()
		this.bindEvent()
	},
	loadCart:function(){
		var _this = this;
		_cart.getCart(function(cart){
			_this.renderCart(cart)
		},function(){
			_this.$elem.html('<p class="empty-msg">未获取到购物车信息！！</p>')
		})
	},
	renderCart:function(cart){
		_nav.loadCartCount()
		if(cart.cartList.length >= 0){
			//缓存总价格，用来校验提交订单
			this.totalCartPrice = cart.totalCartPrice;
			//处理图片
			cart.cartList.forEach(function(item){
				item.product.mainImg = item.product.images.split(',')[0]
			})
				var html = _util.render(tpl,cart);
				this.$elem.html(html)
			}else{
				this.$elem.html('<p class="empty-msg">购物车为空，赶快去购物吧!!!</p>')
			}
	},
	bindEvent:function(){
		var _this = this;
		//单条取消，选中
		this.$elem.on('click','.select-one',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id')
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		});
		//全选，全取消
		this.$elem.on('click','.select-all',function(){
			var $this = $(this);
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		});
		//删除一条
		this.$elem.on('click','.delete-one',function(){
			if(_util.confirm('你确定要删除这条数据吗')){
				var $this = $(this);
				var productId = $this.parents('.product-item').data('product-id')
					_cart.deleteOne({productId:productId},function(cart){
						_this.renderCart(cart)
					},function(msg){
						_util.showErrorMsg(msg)
					})
			}
		})
		//删除选中的
		this.$elem.on('click','.delete-selected',function(){
			if(_util.confirm('你确定要删除选中的数据')){
					_cart.deleteSelected(function(cart){
						_this.renderCart(cart)
					},function(msg){
						_util.showErrorMsg(msg)
					})
			}
		})
		//修改数量
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id');
			var $input = $this.siblings('.count-input');
			var stock = $input.data('stock');
			var current = parseInt($input.val());
			var newCount = 0;
			if($this.hasClass('plus')){
				if(current == stock){
					_util.showErrorMsg('库存不足')
					return;
				}
				newCount = current + 1;
			}else if($this.hasClass('minus')){
				if(current == 1){
					_util.showErrorMsg('最低一条')
					return;
				}
				newCount = current - 1;
			}
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart);
			},function(msg){
				_util.showErrorMsg(msg)
			})
		});
		this.$elem.on('click','.btn-submit',function(){
			if(_this.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrorMsg('请选择结算商品')
			}
		})
		
	}
	
}
$(function(){
	page.init()
})