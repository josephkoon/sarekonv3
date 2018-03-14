import {
	ENUMERATE_DVDS
} from '../actions/types';


export default function(state={count:null, dvds:null}, action){
	switch(action.type){

		case ENUMERATE_DVDS:
		return {...state, count:action.payload.count, dvds:action.payload.dvds }

		default:
		return state

	}
}