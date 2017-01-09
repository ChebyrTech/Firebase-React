/*
 *
 * SignIn
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from './../../utils/auth';

export class SignIn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="g-row sign-in" >
        <div className="g-col" >
          <h1 className="sign-in__heading" >Sign in</h1>
          <button className="btn sign-in__button" onClick={this.props.signInWithGoogle} >Google</button>
          <button className="btn sign-in__button" onClick={this.props.signInWithFacebook} >Facebook</button>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithFacebook: authActions.signInWithFacebook,
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
