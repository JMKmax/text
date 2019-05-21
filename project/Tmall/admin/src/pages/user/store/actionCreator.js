import * as types from './actionTypes.js'
import { request } from 'util'
import { GET_USERS } from 'api'

const getPageRequstAction = ()=>{
	return {
		type:types.PAGE_REQUST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}

const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequstAction())
		request({
			url:GET_USERS,
			data:{
				page:page
			}
		})
		.then(result=>{
			console.log(result)
			if(result.code == 0){
				dispatch(setCountAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}