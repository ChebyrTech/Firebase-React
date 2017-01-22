/**
 *
 * Header
 *
 */

import React from 'react';

class Toast extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div
        aria-live="assertive" aria-atomic="true" aria-relevant="text"
        className="mdl-snackbar mdl-js-snackbar"
      >
        <div className="mdl-snackbar__text" ></div>
        <button type="button" className="mdl-snackbar__action" ></button>
      </div>
    );
  }
}

export default Toast;
