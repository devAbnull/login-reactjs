import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

import reducer from './reducers'
import rootSaga from './sagas'

import {clearError} from './actions'

import App from './components/App'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
console.log('hey!! mm')
let logger = createLogger({
	predicate: (getState, action) => action.type !== 'CHANGE_FORM'
})

let sagaMiddleware = createSagaMiddleware()

let store = createStore(reducer, applyMiddleware(logger,sagaMiddleware))

sagaMiddleware.run(rootSaga)

function chkAuth(nextState, replace){
	let {loggedIn} = store.getState()
	console.log('[chkAuth]')
	store.dispatch(clearError())

	if(nextState.location.path !== '/dashboard' ){
		console.log('[chkAuth] not in dashboard!')
		if(loggedIn){
			if(nextState.location.state && nextState.location.pathname){
				console.log('[chkAuth] not in dashboard! in. if')
				replace(nextState.location.pathname)
			}
			else{
				console.log('[chkAuth] not in dashboard! in else')
				replace('/')
			}
		}
	}
	else{
		if(!loggedIn){
			if(nextState.location.state && nextState.location.pathname){
				replace(nextState.location.pathname)
			}
			else{
				replace('/')
			}
		}
	}
}

class LoginFlow extends Component{
	constructor(props) {
		super(props);
		console.log('[LoginFlow.constructor]')
	};
	render(){
		console.log('[LoginFlow.render]')
		return (
			<Provider store={store}>
			<Router history= {browserHistory}>
			<Route path ="/" component={App}>
				
			</Route>
				
			</Router>
			</Provider>
			)
	}

}

ReactDOM.render(<LoginFlow />, document.getElementById('app'))

