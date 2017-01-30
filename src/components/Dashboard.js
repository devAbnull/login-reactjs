import React, {Component} from 'react'
import {logout, changeForm} from '../actions'
import {connect} from 'react-redux'

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this._logout = this._logout.bind(this)
	}

	render(){
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
		this.props.dispatch(logout())
	}
}

function select (state){
	return {
		data: state
	}
}

export default connect(select) (Dashboard)