import { browserHistory as history } from 'react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './actions';
import { firebaseAuth } from './../firebase';

function* signIn(authProvider) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithPopup], authProvider);
    yield put(authActions.signInFulfilled(authData.user));
    yield history.push('/');
  } catch (error) {
    yield put(authActions.singInFailed(error));
  }
}

// =====================================
//  WATCHERS
// -------------------------------------

export function* watchSignIn() {
  while (true) {
    const { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.authProvider);
  }
}

export const authSaga = [
  fork(watchSignIn),
];

export function* sagas() {
  yield [
    ...authSaga,
  ];
}
