/*
* @Author: macnookpro
* @Date:   2019-05-30 22:55:01
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-31 09:32:49
*/
import axios from 'axios'

const SERVE = 'http://127.0.0.1:3000'

export default getHomeProduct = ()=>{
	return axios({
		url:SERVE+'/products/homeProducts'
	})
	.then(result=>{
		if(result.data.code == 0){
			return result.data.data
		}else{
			throw 'no data'
		}
	})
	.catch(err=>{
		console.log(err)
	})
}