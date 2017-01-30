import {take, call, put, fork, race} from 'redux-saga/effects'
import auth from '../auth'
import {browserHistory} from 'react-router'
import { SET_AUTH, LOGIN_REQ, FAILURE, CHANGE_FORM ,SENDING_REQ, LOGOUT } from '../actions'

export function * authorize(username){
	console.log('authorize '+username)
	yield put({type: SENDING_REQ, sending: true})

	try{
		let response
		response = yield call(auth.login, username)
		console.log('got repsonse')
		return response
	}

	catch(error){
		console.log('Got error')
		yield put({type: FAILURE, error: error.message})

		return false
	}

	finally{
		console.log('finally')
		yield put({type: SENDING_REQ, sending: false})
	}
}

export function * logout(){
	yield put({type: SENDING_REQ, sending: true})

	try{
		let response = yield call(auth.logout)
		yield put({type: SENDING_REQ, sending: false})

		return response
	}

	catch(error){
		yield put({type: FAILURE, error: error.message})
	}
}

export function * loginBg(){
	console.log('[loginBg]')
	while(true){
		let request = yield take(LOGIN_REQ)
		let username = request.data
		console.log('Got username'+username)
		let winner = yield race({
			auth: call(authorize, username),
			logout: take(LOGOUT)
		})
		
		if (winner.auth){
			console.log('winner.auth '+winner.auth)
			yield put({type: SET_AUTH, authState: true})
			console.log('winner.auth chk1')
			yield put({type: CHANGE_FORM, newFormState: {username: username, noVisits : winner.auth}})
			console.log('winner.auth cool')
			forwardTo('/')
		}
		else if(winner.logout){
			yield put({type:SET_AUTH, authState: false})
			yield call(logout)
			forwardTo('/')
		}
	}
}

export function * logoutBg(){
	while (true){
		yield take(LOGOUT)
		console.log('logoutBg')
		yield put({type: SET_AUTH, authState: false})

		yield call(logout)
		forwardTo('/')
	}
}

export default function * root(){
	yield fork(loginBg)
	yield fork(logoutBg)
}

function forwardTo (location) {
  browserHistory.push(location)
}