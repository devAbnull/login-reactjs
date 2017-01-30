import React, {Component} from 'react'
import {loginRequest, changeForm} from '../actions'
import {connect} from 'react-redux'
class Login extends Component{
	constructor(props) {
		super(props);
		this._username = ''
		this._onLogin = this._onLogin.bind(this)
		this._chngUsername = this._chngUsername.bind(this)
	}

	render(){
			let {dispatch} = this.props
			let {formState, sending, error} = this.props.data
			console.log('[Login] render'+sending)
		return(

			<form className='form' onSubmit={this._onLogin}>
			<div><label>Username</label></div>
			<div>
				<input type="text" id='username' onChange={this._chngUsername} value={this.props.data.username}/>
				<button  type="Submit">
					Login
				</button>
			</div>
			</form>
		)
	}

	_chngUsername(event){
		//console.log('[Login] _chngUsrname '+event.target.value)
		//this._emitChange({...this.props.data, username: event.target.value})
		this._username = event.target.value
	}

	_emitChange(newFormState){
		//this.props.dispatch(changeForm(newFormState))
		//console.log('[Login] _emitChange '+newFormState.username)
	}

	_onLogin(event){
		event.preventDefault()
		console.log('[Login] _onLogin '+this._username)
		this.props.dispatch(loginRequest(this._username))
	}
}

function select (state){
	return {
		data: state
	}
}

export default connect(select) (Login)