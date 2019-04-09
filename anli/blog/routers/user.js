/*
* @Author: jing
* @Date:   2019-04-08 10:31:04
* @Last Modified by:   jing
* @Last Modified time: 2019-04-08 17:58:27
*/
const express = require('express');
const router = express.Router();
router.post('/register',(req,res)=>{
	console.log(req.body);
	res.json({status:0})
})

module.exports = router;