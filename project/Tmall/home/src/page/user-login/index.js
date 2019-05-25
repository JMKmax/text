/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-22 10:19:33
*/
require('page/common/logo')
require('page/common/footer')
var _util = require('util')
var _user = require('service/user')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submitLogin()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitLogin()
			}
		})
	},
	submitLogin:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2.验证数据
		var velidataResult = this.validata(formData)
		//3.提交
		if(velidataResult.status){
			formErr.hide()
			_user.login(formData,function(){
				window.location.href = _util.getParamFromUrl('redirect') || '/'
			},function(msg){
				formErr.show(msg)
			})
		}
		else{
			formErr.show(velidataResult.msg)
		}
	},
	validata:function(formData){
		var result = {
			status:false,
			msg:''
		}
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result
		}
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确';
			return result
		}
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result
		}
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确';
			return result
		}


		result.status = true;
		return result
	}
}
$(function(){
	page.init()
})