/*
* @Author: macnookpro
* @Date:   2019-05-20 14:55:42
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-26 10:31:43
*/
var _util = require('util')
var _product = {
	getProductList:function(data,success,error){
		_util.requst({
			url:'/product/home/list',
			data:data,
			success:success,
			error:error
		})
	},
	getProductDetail:function(data,success,error){
		_util.requst({
			url:'/product/home/detail',
			data:data,
			success:success,
			error:error
		})
	},
	
}
module.exports = _product