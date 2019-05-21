/*
* @Author: jing
* @Date:   2019-04-08 10:30:55
* @Last Modified by:   jing
* @Last Modified time: 2019-04-08 17:58:29
*/
const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
	res.render('main/index')
})

module.exports = router;