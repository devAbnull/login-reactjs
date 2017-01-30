import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'

class App extends Component{
	render(){
		let app=this.props.data.loggedIn?<Dashboard />:<Login />
		console.log((this.props.data))
		return (
			<div>
			{app}
				
			</div>
		)
	}
	

	
}
function select(state) {
		return {
			data: state
		}
}
export default connect(select) (App)