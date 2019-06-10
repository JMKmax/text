/*
* @Author: macnookpro
* @Date:   2019-05-20 14:55:32
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 19:44:24
*/
var Hogan = require('hogan.js')
var _util = {
	requst:function(options){
		var _this = this;
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || 'json',
			data:options.data || '',
			success:function(result){
				if(result.code == 0){
					options.success && options.success(result.data)
				}
				else if(result.code == 1){
					options.error && options.error(result.message)
				}
				else if(result.code == 10){
					//跳转到登陆界面
					_this.goLogin()
				}
			},
			error:function(err){
				options.errof && options.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	confirm:function(msg){
		return window.confirm(msg)
	},
	goLogin:function(){
		window.location.href = './user-login.html?redirect='+window.location.href
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1)
		//?type=register
		//?type=register&&id=123
		//?name=Tom&&type=register&&id=123
		var reg = new RegExp('(^|&)'+key+'=([^|&]*)(&|$)')
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var output = template.render(data);
		return output
	},
	validate:function(value,type){
		var value = $.trim(value)
		if(type == 'require'){
			return !!value
		}
		if(type == 'username'){
			return /^[a-zA-Z0-9_]{3,6}$/.test(value)
		}
		if(type == 'password'){
			return /^[a-zA-Z0-9_]{3,6}$/.test(value)
		}
		if(type == 'phone'){
			return /^1[3578]\d{9}$/.test(value)
		}
		if(type == 'email'){
			return /^\w+@\w+.\w{2,6}$/.test(value)
		}
	}
}
module.exports = _util