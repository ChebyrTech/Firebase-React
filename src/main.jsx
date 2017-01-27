import React from 'react'  
import ReactDOM from 'react-dom'
import { Router, Link, IndexRoute, Route, hashHistory } from 'react-router'

// redux setup 
import redux from 'redux'  
import { Provider } from 'react-redux' 
import store from './store.js'

// containers 
import Auth from './containers/auth.jsx' 
import Dashboard from './containers/dashboard.jsx' 
import NewPost from './containers/new_post.jsx' 
import Feed from './containers/feed.jsx'
import User from './containers/user.jsx'

// components
import About from './components/about.jsx'
import PostWrap from './components/post_wrapper.jsx'


class App extends React.Component {

    render() {

        return ( 
        <div>
            <Auth>{this.props.children}</Auth>
        </div>
        )
    }
}

var container = document.getElementById('app'); 

// app routes 
ReactDOM.render(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                    <IndexRoute component={Feed}></IndexRoute>
                    <Route path="/about" component={About}></Route>
                    <Route path="/feed" component={Feed}></Route>
                    <Route path="/add" component={NewPost}></Route>
                    <Route path="/user/:uid" component={User}></Route>
                    <Route path="/post/:postid" component={PostWrap}></Route>

        </Route>
    </Router>
</Provider>, container); 

