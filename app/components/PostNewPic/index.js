/**
 *
 * Header
 *
 */

import React from 'react';

class PostNewPic extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section id="page-add" className="mdl-grid fp-content" style={{ display: 'block' }} >
        <div
          className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--no-spacing"
        >
          <div
            className="fp-addcontainer mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop"
          >
            <div className="fp-overlay" >
              <i className="material-icons" >hourglass_full</i>
            </div>
            <img role="presentation" id="newPictureContainer" src="" />
            <div className="mdl-card__supporting-text mdl-color-text--grey-600" >
              <form id="uploadPicForm" action="#" >
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                  <input className="mdl-textfield__input" type="text" id="imageCaptionInput" />
                  <label className="mdl-textfield__label" htmlFor="imageCaptionInput" >Image
                    caption...
                  </label>
                </div>
                <br />
                <button
                  type="submit"
                  className="fp-upload mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400"
                >
                  Upload this pic!
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PostNewPic;
