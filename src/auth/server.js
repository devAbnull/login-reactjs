let users
let localstorage = window.localStorage

let server = {
	init(){
		if (localstorage.users === undefined){
			let abhijit = 'abhijit'
			let cntVisit = 0
			users = {
				[abhijit] : cntVisit
			}

			localstorage.users = JSON.stringify(users)
			
		}
		else{
			users = JSON.parse(localstorage.users) 
		}
		
	},

	login(username){
		let userExists = this.chkUser(username)
		let resolve = {}
		console.log('[auth.server.login]')
		if(userExists){
			users[username]++;
			localstorage.users = JSON.stringify(users)
		}
		else{
			users[username] = 1;
			localstorage.users = JSON.stringify(users)
		}
		
		resolve['auth'] = true, 
		resolve['token']= Math.random().toString(36).substring(7)
		resolve['noVisits'] = users[username]
		
		console.log('resolve is '+resolve)
		return resolve
		
	},

	chkUser(username){
		return !(users[username] === undefined)
	},

	logout(){
		return new Promise(resolve => {
			localstorage.removeItem('token')
			localstorage.removeItem('activeUser')
			resolve(true)
		})
	}

}

server.init()
export default server