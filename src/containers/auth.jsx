import React from 'react'
import { Link } from 'react-router'

import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../actions/appActions.js'

import Dashboard from './dashboard.jsx'

import authReducer from '../reducers/auth.js'

import FirebaseHandler from '../firebase/firebase'



class Auth extends React.Component {

    constructor() {
        super()
        this.auth = firebase.auth();
        this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
        this.state = {
            signOutOnlyStyle: {},
            loggedInCls: '', 
            mounted: false, 
            loggedOutStyle: {
                display: 'flex'
            } 
        }


        this.skipAuthHandler = this.skipAuthHandler.bind(this);
    }


    componentDidMount() {

        this.setState({
            mounted: true 
        })

        var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
        firebaseUi.start('#firebaseui-auth-container', uiConfig);


        if (this.props.router.location.pathname != '/') {
            this.setState({ loggedInCls: "login-fadeout" });

            var self = this; 
            setTimeout(() => {

                if (self.state.mounted) {
                    self.setState({
                        loggedOutStyle: {
                            display: 'none'
                        }
                    })
                }
            }, 500)
        } 
    } 

    componentWillUnmount() {
        this.setState({
            mounted: false 
        })
    }


    /**
    * Authentication
    */
    onAuthStateChanged(user) {
        if (user) {

            this.props.signIn(user);
        

            this.setState({
                loggedInCls: 'login-fadeout'
            })

            var self = this; 
            setTimeout(() => {

                if (self.state.mounted) {
                    self.setState({
                        loggedOutStyle: {
                            display: 'none'
                        }
                    })
                }
            }, 500)

            FirebaseHandler.saveUserData(user.photoURL, user.displayName);
        } else {

            this.setState({ 
                signOutOnlyStyle: { display: 'block' } 
         });
         this.props.signOut(); 
            
    
        }
    }

    /**
   * Skip authentication
   */
    skipAuthHandler() {
        this.setState({ loggedInCls: "login-fadeout" });

        var self = this; 
        setTimeout(() => {

            if (self.state.mounted) {
                self.setState({
                    loggedOutStyle: {
                        display: 'none'
                    }
                })
            }
        }, 500)

        this.props.router.push('/feed');
    }


    render() {

        return (
            <div>
                <div className={"logged-out " + this.state.loggedInCls} style={this.state.loggedOutStyle}>
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
                    <Dashboard>{this.props.children}</Dashboard>
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
        signIn: appActions.signIn, 
        signOut: appActions.signOut
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Auth)); 