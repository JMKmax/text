/*
* @Author: jing
* @Date:   2019-03-20 15:01:49
* @Last Modified by:   jing
* @Last Modified time: 2019-03-20 15:05:35
*/
const str = 'hello world';
const fn = ()=>{
	console.log(str)
}
const obj = {
	name:'tom',
	age:18
};
exports.str = str;
exports.obj = obj;
exports.fn = fn;