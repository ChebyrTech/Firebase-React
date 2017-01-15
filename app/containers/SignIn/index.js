/*
 *
 * SignIn
 *
 */
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from './../../utils/auth';


const authUi = new firebaseui.auth.AuthUI(firebase.auth());
export class SignIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const self = this;
    const uiConfig = {
      callbacks: {
        signInSuccess(user) {
          if (self.props.signIn) {
            self.props.signIn(user);
          }
          return false;
        },
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
    };
    authUi.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <section id="page-splash" >
        <h3 className="fp-logo" ><i className="material-icons" >photo</i> Friendly Pix</h3>
        <div className="fp-caption" >The friendliest way to share your pics</div>
        <div id="firebaseui-auth-container" ></div>
        <a className="fp-skip" href="/feed" >skip sign in</a>
      </section>
    );
  }
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithFacebook: authActions.signInWithFacebook,
  signIn: authActions.signInFulfilled,
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
