import { SET_AUTH, LOGIN_REQ, FAILURE, CHANGE_FORM ,SENDING_REQ, CLEAR_ERROR, LOGOUT } from '../actions'
import auth from '../auth'

let initialState = {
	formState : auth.getformState(),
	error : '',
	loggedIn: auth.loggedIn(),
	sending: false
}

export default function reducer (state=initialState, action) {
	console.log('[reducer]'+action.type)
	switch (action.type) {
		case LOGIN_REQ:
			let n = auth.login(action.data)
			console.log('[reducer]'+action.type)
			return {... state, formState: {username: action.data, noVisits: n}}
		case CHANGE_FORM:
			return {...state, formState: action.newFormState}
		case FAILURE :
			return {...state, error: action.error}
		case CLEAR_ERROR :
			return {...state, error: ''}
		case SET_AUTH:
			return {...state, loggedIn: action.authState}
		case LOGOUT:
			return {...state, loggedIn: false}
		default:
			return state

	}

}