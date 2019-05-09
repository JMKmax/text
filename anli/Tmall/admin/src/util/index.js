/*
* @Author: jing
* @Date:   2019-04-24 15:21:42
* @Last Modified by:   jing
* @Last Modified time: 2019-04-25 19:55:05
*/
import axios from 'axios';

export const request = (option)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			method:option.method || 'get',
			url:option.url || '',
			withCredentials: true
		}
		switch(params.method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				params.params = option.data
				break
			default:
				params.data = option.data
		}

		axios(params)
		.then(result=>{
			const data = result.data;
			if(data.code == 10){
				removeUserName()
				window.location.href = '/login'
				reject('没有权限')
			}else{
				resolve(result.data)
			}	
		})
		.catch(err=>{
			reject(err)
		})
	})
}

export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}
export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}
export const removeUserName = ()=>{
	return window.localStorage.removeItem('username')
}