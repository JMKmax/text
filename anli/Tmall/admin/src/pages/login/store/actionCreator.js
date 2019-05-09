import * as types from './actionTypes.js'
import { message } from 'antd'
import { request,setUserName } from 'util'
import { ADMIN_LOGIN} from 'api'

const getLoginRequstAction = ()=>{
	return {
		type:types.LOGIN_REQUST
	}
}
const getLoginDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}


export const getLoginAction = (values)=>{
	return (dispatch)=>{
		// this.setState(()=>({isFething:true}))
		dispatch(getLoginRequstAction())
		/*
        axios({
        	method:'post',
        	url:'http://127.0.0.1:3000/admin/login',
        	data:values
        })
        .then(result=>{
        	if(result.data.code == 0){
        		window.location.href = '/'
        	}else{
        		message.error(result.data.message)
        	}
        })
        .catch(err=>{
        	console.log(err)
        	message.error('请求失败，请稍后再试')
        })
        .finally(()=>{
        	dispatch(getLoginDoneAction())
        })
        */
       	request({
        	method:'post',
        	url:ADMIN_LOGIN,
        	data:values
        })
        .then(result=>{
        	if(result.code == 0){
        		setUserName(result.data.username)
        		window.location.href = '/'
        	}else{
        		message.error(result.data.message)
        	}
        })
        .catch(err=>{
        	console.log(err)
        	message.error('请求失败，请稍后再试')
        })
        .finally(()=>{
        	dispatch(getLoginDoneAction())
        })
	}
}
