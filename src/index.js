import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import reducer from './reducers'
import {clearError} from './actions'
import App from './App'


console.log('hey!! mm')
let store = createStore(reducer)

class LoginFlow extends Component{
	constructor(props) {
		super(props);
		console.log('[LoginFlow.constructor]')
	};
	render(){
		console.log('[LoginFlow.render]')
		return (
			<Provider store={store}>
			<App />
			</Provider>
			)
	}

}

ReactDOM.render(<LoginFlow />, document.getElementById('app'))

