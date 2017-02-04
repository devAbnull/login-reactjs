import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Login from './Login'
// import Dashboard from './Dashboard'

import {logout,
	loginRequest,
	changeForm,
	clearError,
	failure,
	setAuth} from './actions'

class App extends Component{
	constructor(props) {
		super(props);
		this._logout_render = this._logout_render.bind(this)
		this._login_render = this._login_render.bind(this)
		this._username = ''
		this._onLogin = this._onLogin.bind(this)
		this._chngUsername = this._chngUsername.bind(this)
		this._logout = this._logout.bind(this)
	}

	render(){
		console.log(this.props.data)
		let app=this.props.data.loggedIn?this._logout_render:this._login_render
		console.log((app))
		let error = this.props.data.error
		return (
			<div>
			{app()}
			{error}
			</div>
		)
	}

	_logout_render(){
		let username = this.props.data.formState.username
		let noVisits = this.props.data.formState.noVisits
		console.log('Dashboard.render'+username+' visits '+noVisits)
		return(
			
			<div>Hey {username}! How u doing?
			You have visited here {noVisits} times
			<div>
				<button onClick={this._logout}>Logout</button>
			</div>
			</div>
			
			
		)
	}

	_logout(event){
		event.preventDefault()
		console.log('Logging out')
		this.props.dispatch(changeForm({username: ''}))
		this._username = ''
		this.props.dispatch(logout())
	}
	
	_login_render(){
			
		return(
			<div>
			<form className='form' onSubmit={this._onLogin}>
			<div><label>Username</label></div>
			<div>
				<input type="text" id='username' onChange={this._chngUsername} value={this.props.data.username}/>
				<button  type="Submit">
					Login
				</button>
			</div>
			</form>
			</div>
		)
	}

	_chngUsername(event){
		//console.log('[Login] _chngUsrname '+event.target.value)
		this.props.dispatch(clearError())
		this._username = event.target.value
	}

	_onLogin(event){
		event.preventDefault()
		console.log('[Login] _onLogin '+this._username)
		if(this._username === '')
			this.props.dispatch(failure('Please provide username!'))
			
		else{
			this.props.dispatch(loginRequest(this._username))
			this.props.dispatch(setAuth(true))
		}

	}
	
}

function select(state) {
		return {
			data: state
		}
}
export default connect(select) (App)