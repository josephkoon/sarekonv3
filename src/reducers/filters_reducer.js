import {
	ENUMERATE_FILTERS
} from '../actions/types';


export default function(state={groups:null, modes:null}, action){
	switch(action.type){

		case ENUMERATE_FILTERS:
		return {...state, groups:action.payload.groups, modes:action.payload.modes }

		default:
		return state

	}
}