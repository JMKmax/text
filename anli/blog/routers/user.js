/*
* @Author: jing
* @Date:   2019-04-08 10:31:04
* @Last Modified by:   jing
* @Last Modified time: 2019-04-09 22:50:02
*/
const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js')
router.post('/register',(req,res)=>{
	const {username,password} = req.body;
	const result = {
		status:0,
		msg:''
	};
	//检查是否注册过
	UserModel.findOne({username})
	.then(user=>{
		if(user){//user存在，则注册失败
			result.status = 10,
			result.msg = '用于已经注册过',
			res.json(result)
		}else{
			UserModel.insertMany({
				username,
				password
			})
			.then(user=>{
				result.data = user,
				res.json(result)
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{ //不是找不到用户名出错，而是服务器出错
		result.status = 10,
		result.msg = '服务器出错',
		res.json(result)
	})
})

module.exports = router;