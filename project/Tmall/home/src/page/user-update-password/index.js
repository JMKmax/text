/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-25 10:15:44
*/
require('page/common/nav')
require('page/common/search')
require('page/common/footer')
require('./index.css')
var _side = require('page/common/side')
require('./index.css')
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
		this.onload()
	},
	onload:function(){
		_side.render('user-update-password')
	},
	bindEvent:function(){
		var _this = this
		//用户注册
		$('#btn-submit').on('click',function(){
			_this.submitUpdatePassword()
		})
	},
	submitUpdatePassword:function(){
		//1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2.验证数据
		var velidataResult = this.validata(formData)
		//3.提交
		if(velidataResult.status){
			formErr.hide()
			_user.updatePassword(formData,function(){
				window.location.href = './result.html?type=updatePassword'
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
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result
		}
		
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确';
			return result
		}
		if(formData.repassword != formData.password){
			result.msg = '两次密码不一致';
			return result
		}
		result.status = true;
		return result
	}
	
}
$(function(){
	page.init()
})