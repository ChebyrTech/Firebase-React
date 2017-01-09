import { firebaseAuth } from '../firebase';
import { authActions } from './actions';

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const sub = firebaseAuth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          dispatch(authActions.signInFulfilled(authUser));
        }

        resolve();
        sub();
      },
      (error) => reject(error)
    );
  });
}
