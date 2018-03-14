import {
	AUTH_USER,
	UNAUTH_USER
} from '../actions/types';


export default function(state={error:null, authenticated:null, user_name:null, brand:null, user_permissions:null, user_preferences:null}, action){
	switch(action.type){

		case AUTH_USER:
		return {...state, error:'', authenticated:true, user_name:action.payload.user_name, brand:action.payload.brand, user_permissions:action.payload.user_permissions, user_preferences:action.payload.user_preferences }

		case UNAUTH_USER:
		return {...state, error:'', authenticated:false}

		default:
		return state

	}
}