import server from './server'

let localstorage

localstorage = window.localStorage

let auth = {
	
	login(username){
		let response = {}
		
		console.log('[auth.login]')
		response = server.login(username)
		localstorage.token = response.token
		let noVisits = response.noVisits
		localstorage.activeUser = JSON.stringify({username: username,noVisits: noVisits})
		console.log('users '+localstorage.users)
		
		return noVisits
		

	},
	loggedIn(){
		return !!localstorage.token
	},
	getformState(){
		if(localstorage.activeUser === undefined )
			return {username:'', noVisits:0}
		return JSON.parse(localstorage.activeUser)
	},

	

	logout(){
		return server.logout()
	}
}

export default auth
