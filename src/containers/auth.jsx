import React from 'react' 
import {Link} from 'react-router'

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

import store from '../store.js'; 
import * as appActions from '../actions/appActions.js'

import Dashboard from './dashboard.jsx'

import authReducer from '../reducers/auth.js' 



class Auth extends React.Component {

    constructor() { 
        super() 
        this.auth = firebase.auth(); 
        this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user)); 
        this.state = {
            signOutOnlyStyle: {}, 
            loggedICls: '', 
            user: {} 
        } 


        this.skipAuthHandler = this.skipAuthHandler.bind(this);
    }

    componentDidMount() { 

      var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth()); 
      firebaseUi.start('#firebaseui-auth-container', uiConfig); 
       
    }  
    componentWillMount() {

        if (store.getState().auth.uid != '') {
            this.setState({loggedInCls: "login-fadeout"});
            this.setState({signOutOnlyStyle: {display: 'none'}});   
        }
    }

    onAuthStateChanged(user) {
        if (user) { 

            
          
            
            this.props.signIn(user); 
            
            console.log('logged in'); 

            
        } else {
            this.setState({loggedInCls: ''});  
            this.setState({signOutOnlyStyle: {display: 'block'}});    

            // var container = document.getElementById('firebaseui-auth-container'); 
            // container.innerHTML = ''; 

            console.log('logged out'); 
        }
    } 

    skipAuthHandler() {
        this.setState({loggedInCls: "login-fadeout"}); 

    }


    render() { 

        return (
            <div> 
                <div className={"logged-out " + (this.state.loggedInCls)}>
                <div className="fp-theatre"><img className="fp-fullpic" /></div>
                <section id="page-splash">
                    <h3 className="fp-logo"><i className="material-icons">photo</i> Friendly Pix</h3>
                    <div className="fp-caption">The friendliest way to share your pics</div>
                    <div className="fp-signed-out-only" style={this.state.signOutOnlyStyle}> 
                        <div id="firebaseui-auth-container" className="fp-signed-out-only">
                        </div>
                        <p onClick={this.skipAuthHandler} className="fp-skip">skip sign in</p>
                    </div>
                </section> 
                </div>
                <div className="logged-in">
                        <Dashboard/>
                </div> 
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}  


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn: appActions.signIn
    }, dispatch) 
}

export default connect(mapStateToProps, matchDispatchToProps)(Auth); 