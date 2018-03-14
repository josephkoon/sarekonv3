import {
	SHOW_DVD,
	UNSHOW_DVD
} from '../actions/types';


export default function(state={dvds:[]}, action){
	switch(action.type){

		case SHOW_DVD:
		return {...state, 
			dvds:[...state.dvds, action.payload]
		}

		case UNSHOW_DVD:
	    const deviceID = action.payload;
	    return {...state, dvds:state.dvds.filter(dvds => dvds.dvdDetails.device.device_id !== deviceID)}

	    default:
	    return state

	}
}