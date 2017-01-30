export const LOGIN_REQ = 'LOGIN_REQ'
export const FAILURE = 'FAILURE'
export const SET_AUTH = 'SET_AUTH'
export const CHANGE_FORM = 'CHANGE_FORM'
export const SENDING_REQ = 'SENDING_REQ'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const LOGOUT = 'LOGOUT'

export function loginRequest(data) {
	return {type: LOGIN_REQ, data}
}

export function logout(){
	return {type: LOGOUT}
}

export function changeForm(newFormState) {
	return {type: CHANGE_FORM, newFormState}
}

export function sendingReq(sending) {
	return {type: SENDING_REQ, sending}
}

export function failure(error) {
	return {type: FAILURE, error}
}

export function clearError(){
	return {type: CLEAR_ERROR}
}

export function setAuth(authState) {
	return {type: SET_AUTH, authState}
}