/*
* @Author: jing
* @Date:   2019-04-07 18:27:46
* @Last Modified by:   jing
* @Last Modified time: 2019-04-09 16:43:11
*/
const express = require('express');
const swig = require('swig')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = new express();
const port = 3000;

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',(err)=>{
	console.log(err);
	throw err;
});
db.on('open',()=>{
	console.log('connection success')
})

app.use(express.static('public'));


//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})
//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

//post/put请求处理中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/',require('./routers/index.js'));
app.use('/user',require('./routers/user.js'));




app.listen(port,()=>console.log(`app listening on port ${port}!`))