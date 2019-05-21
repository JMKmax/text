/*
* @Author: jing
* @Date:   2019-04-26 16:16:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-21 12:00:53
*/
require('page/common/logo')
require('page/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')

$(function(){
	var type = _util.getParamFromUrl('type') || null;
	$('.'+type).show()
})