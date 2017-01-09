import { Record } from 'immutable';
import { authActions } from './actions';
export const AuthState = new Record({
  authenticated: false,
  uid: null,
  user: null,
});

export function authReducer(state = new AuthState(), { payload, type }) {
  let a;

  switch (type) {
    case authActions.SIGN_IN_FULFILLED:
      a = state.merge({
        authenticated: true,
        uid: payload.uid,
        user: payload,
      });

      return a;
    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        user: null,
      });
    default:
      return state;
  }
}
