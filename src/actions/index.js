import axios from 'axios'

import { 
		AUTH_USER, 
		UNAUTH_USER,
		
		ENUMERATE_FILTERS,

		ENUMERATE_DVDS,

		SHOW_DVD,
		UNSHOW_DVD
} from './types'


const Querystring = require('query-string');
const ROOT_URL = 'https://sys.sarekon.com:7000';





export function signinUser(login,password){
	return async function(dispatch){

	  	try{

		  	var data = Querystring.stringify({ 
		                "login":login,
		                "password":password,
		                "retUserInfo":1
		            });

		  	//Get user
	  		const user = await axios.post(ROOT_URL+'/session/create.json',data:data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})

	  		localStorage.setItem('token', user.data.sid)

	  		return dispatch(authUser(user.data))


	  	} catch(error){
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data);
			  }
	  	}

	}
}



export function authUser(user){
	return {
		type:AUTH_USER,
		payload:user
	}
}


//Sign out
export function signoutUser(){
	localStorage.removeItem('token')
	return { type: UNAUTH_USER }
}







export function enumerateDVDfilters(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {
			const filters = await axios.get(ROOT_URL+'/dvd/filters_enumerate.json/?sid='+localStorage.getItem('token'))

			return dispatch(DVDfilters(filters.data))

		} catch(error){
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data);
			  }
	  	}
	}
}


export function DVDfilters(filters){
	return {
		type:ENUMERATE_FILTERS,
		payload:filters
	}
}





export function enumerateDVDs(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {
			const dvds = await axios.get(ROOT_URL+'/dvd/enumerate.json/?sid='+localStorage.getItem('token'))

			return dispatch(DVDs(dvds.data))

		} catch(error){
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data);
			  }
	  	}
	}
}


export function DVDs(dvds){
	return {
		type:ENUMERATE_DVDS,
		payload:dvds
	}
}










export function showDVD(deviceID){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {
			var dvdDetails = await axios.get(ROOT_URL+'/dvd/show.json/?sid='+localStorage.getItem('token')+'&device_id='+deviceID)
			var dvdLocations = await axios.get(ROOT_URL+'/location/list.json/?sid='+localStorage.getItem('token')+'&device_id='+deviceID)
			var dvdHistory = await axios.get(ROOT_URL+'/message/list.json/?sid='+localStorage.getItem('token')+'&device_id='+deviceID)

			dvdDetails = dvdDetails.data
			dvdLocations = dvdLocations.data
			dvdHistory = dvdHistory.data
			const dvd = {dvdDetails, dvdLocations, dvdHistory}
			return dispatch(DVD(dvd))

		} catch(error){
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data);
			  }
	  	}
	}
}


export function DVD(dvd){
	return {
		type:SHOW_DVD,
		payload:dvd
	}
}


export function unshowDVD(deviceID){
	return {
		type:UNSHOW_DVD,
		payload:deviceID
	}
}








export function listDVDlocations(){
	//dispatch any actions with redux thunk
	return function(dispatch){

		axios.get(ROOT_URL+'/location/list.json/?sid='+localStorage.getItem('token'))
			.then(function (response) {
			  console.log(response);
			})
			.catch(error => {
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data); // => the response payload 
			  }
			})
	}
}



export function listDVDhistory(){
	//dispatch any actions with redux thunk
	return function(dispatch){

		axios.get(ROOT_URL+'/message/list.json/?sid='+localStorage.getItem('token'))
			.then(function (response) {
			  console.log(response);
			})
			.catch(error => {
			  if (error.response) {
			    // Response has been received from the server
			    console.log(error.response.data); // => the response payload 
			  }
			})
	}
}
















