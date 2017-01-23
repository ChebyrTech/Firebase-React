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
            loggedICls: '' 
        } 

        var self = this; 

        let currentValue = {}; 
        function handleChange() {
        let previousValue = currentValue
        currentValue = store.getState().auth.uid; 

        // redirect after login
        if (previousValue !== currentValue) {
                 self.setState({loggedInCls: 'login-fadeout'})
            }
        }

        store.subscribe(handleChange);
    }

    componentDidMount() { 

      var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth()); 
      firebaseUi.start('#firebaseui-auth-container', uiConfig); 
       
    } 
    onAuthStateChanged(user) {
        if (user) { 

            this.setState({signOutOnlyStyle: {display: 'none'}});   
            this.props.signIn(user); 
            
            console.log('logged in'); 

            
        } else {

            console.log('not logged in'); 
        }
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
                        <Link to="/feed"><p className="fp-skip" href="/feed" >skip sign in</p></Link>
                    </div>
                </section> 
                </div>
                <div className="logged-in">
                        <Dashboard uid={ typeof this.state.user == "undefined" ? '' : this.state.user.uid } 
                                   photoUrl={typeof this.state.user == "undefined" ? '' : this.state.user.photoUrl}  
                                   displayName={typeof this.state.user == "undefined" ? '' : this.state.user.displayName }
                        />
                </div> 
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}  


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn: appActions.signIn
    }, dispatch) 
}

export default connect(mapStateToProps, matchDispatchToProps)(Auth); 