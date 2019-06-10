/*
* @Author: macnookpro
* @Date:   2019-05-20 14:55:42
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-06-10 23:00:21
*/
var _util = require('util')
var _order = {
	getOrderProductList:function(success,error){
		_util.requst({
			url:'/order/orderProductList',
			success:success,
			error:error
		})
	},
}
module.exports = _order