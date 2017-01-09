import firebase from 'firebase';
export const authActions = {
  SIGN_IN: 'sign-in',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',

  signIn: (authProvider) => ({
    type: authActions.SIGN_IN,
    payload: { authProvider },
  }),

  signInFulfilled: (authUser) => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: { authUser },
  }),

  singInFailed: (error) => ({
    type: authActions.SIGN_IN_FAILED,
    payload: { error },
  }),

  signInWithGoogle: () => authActions.signIn(
    new firebase.auth.GoogleAuthProvider()
  ),

  signInWithFacebook: () => authActions.signIn(
    new firebase.auth.FacebookAuthProvider()
  ),
};
