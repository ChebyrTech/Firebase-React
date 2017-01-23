import React from 'react'  
import ReactDOM from 'react-dom'

import redux from 'redux'  
import { Router, Link, IndexRoute, Route, hashHistory } from 'react-router'

import { Provider } from 'react-redux' 
import store from './store.js'

import Auth from './containers/auth.jsx' 
import Dashboard from './containers/dashboard.jsx'

var App = React.createClass({
    
    render() {
        return ( 
        <div>
            <Auth />
        </div>
        )
    }
}) 

var container = document.getElementById('app'); 
ReactDOM.render(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/feed" component={Dashboard}></Route>
    </Router>
</Provider>, container); 
