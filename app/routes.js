// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { isAuthenticated } from './utils/auth';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const paths = {
  HOME: '/',
  SIGN_IN: '/sign-in',
};

const requireAuth = (getState) => (nextState, replace) => {
  if (!isAuthenticated(getState().toJS())) {
    replace(paths.SIGN_IN);
  }
};

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
      path: paths.HOME,
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(store.getState),
    }, {
      path: paths.SIGN_IN,
      name: 'sigin-in',
      getComponent(nextState, cb) {
        System.import('containers/SignIn')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: requireUnauth(store.getState),
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
