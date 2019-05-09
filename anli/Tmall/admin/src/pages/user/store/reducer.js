import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	list:[],
	current:1,
	pageSize:0,
	total:0,
	isFetching:false
})
export default (state=defaultState,action)=>{
	if(action.type == types.PAGE_REQUST){
		console.log('aa')
		return state.set('isFetching',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isFetching',false)
	}
	if(action.type == types.SET_COUNT){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total
		})

	}

	return state;
}