import React from 'react'  
import ReactDOM from 'react-dom'

import redux from 'redux'  
import { Router, Link, IndexRoute, Route, hashHistory } from 'react-router'

import { Provider } from 'react-redux' 
import store from './store.js'

import Auth from './containers/auth.jsx' 
import Dashboard from './containers/dashboard.jsx' 
import NewPost from './containers/new_post.jsx' 

import Feed from './components/feed.jsx'
import About from './components/about.jsx'
import SinglePost from './components/single_post.jsx'


class App extends React.Component {
    componentWillReceiveProps(p) {
        console.log(p)
    }
    render() {

        return ( 
        <div>
            <Auth>{this.props.children}</Auth>
        </div>
        )
    }
}

var container = document.getElementById('app'); 
ReactDOM.render(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                    <Route path="/about" component={About}></Route>
                    <Route path="/feed" component={Feed}></Route>
                    <Route path="/add" component={NewPost}></Route>

                    // temporary solution 
                    <Route path="/user/:uid" component={Feed}></Route>
                    <Route path="/post/:postid" component={SinglePost}></Route>

        </Route>
    </Router>
</Provider>, container); 

