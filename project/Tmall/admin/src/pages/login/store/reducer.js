import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFething:false
})

export default (state=defaultState,action)=>{

	if(action.type == types.LOGIN_REQUST){
		return state.set('isFething',true)
	}
	if(action.type == types.LOGIN_DONE){
		return state.set('isFething',false)
	}

	return state;
}