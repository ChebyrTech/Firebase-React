// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { isAuthenticated } from './utils/auth';
import HomePage from './containers/HomePage';
import SignIn from './containers/SignIn';
import About from './containers/About';

/* const errorLoading = (err) => {
 console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
 };*/

const paths = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  ABOUT: '/about',
  FEED: '/feed',
};

/* const requireAuth = (getState) => (nextState, replace) => {
 if (!isAuthenticated(getState().toJS())) {
 replace(paths.SIGN_IN);
 }
 };*/

const requireUnauth = (getState) => (nextState, replace) => {
  if (isAuthenticated(getState().toJS())) {
    replace(paths.HOME);
  }
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  return [
    {
      path: paths.SIGN_IN,
      name: 'sigin-in',
      component: SignIn,
      onEnter: requireUnauth(store.getState),
    }, {
      indexRoute: {
        component: HomePage,
      },
    }, {
      path: paths.HOME,
      name: 'home',
      component: HomePage,
      onEnter: requireUnauth(store.getState),
    }, {
      path: paths.ABOUT,
      name: 'about',
      component: About,
    },
  ];
}
