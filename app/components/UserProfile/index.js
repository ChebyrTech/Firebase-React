/**
 *
 * Header
 *
 */

import React from 'react';

class UserProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section id="page-user-info" className="mdl-grid fp-content" style={{ display: 'block' }} >
        <div
          className="fp-user-container mdl-shadow--2dp mdl-cell mdl-cell--12-col"
        >
          <div
            className="fp-user-avatar"
          ></div>
          <div
            className="fp-name-follow-container mdl-cell mdl-cell--5-col"
          >
            <div
              className="fp-user-username"
            ></div>
            <div
              className="fp-signed-in-only"
            >
              <label
                className="fp-follow mdl-switch mdl-js-switch mdl-js-ripple-effect"
                htmlFor="follow"
              >
                <input type="checkbox" id="follow" className="mdl-switch__input" value="true" />
                <span className="mdl-switch__label" >Follow</span>
              </label>
              <label
                className="fp-notifications mdl-switch mdl-js-switch mdl-js-ripple-effect"
                htmlFor="notifications"
              >
                <input
                  type="checkbox" id="notifications" className="mdl-switch__input"
                  value="true"
                />
                <span className="mdl-switch__label" >Enable Notifications</span>
              </label>
            </div>
            <div
              className="fp-user-detail-container"
            >
              <div
                className="fp-user-detail"
              ><span className="fp-user-nbposts" >0</span> posts
              </div>
              <div
                className="fp-user-detail"
              ><span className="fp-user-nbfollowers" >0</span>
                followers
              </div>
              <div
                className="fp-user-detail fp-user-nbfollowing-container"
              ><span
                className="fp-user-nbfollowing"
              >0</span> following
              </div>
            </div>
          </div>
        </div>
        <div
          className="fp-user-following mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"
        >
          <button
            className="fp-close-following  mdl-button mdl-js-button mdl-button--raised mdl-button--fab"
          >
            <i className="material-icons" >expand_less</i>
          </button>
        </div>
        <div
          className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid"
        >
          <div
            className="fp-no-posts mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop mdl-grid mdl-grid--no-spacing"
          >
            <div
              className="mdl-card mdl-shadow--2dp mdl-cell
                  mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
            >
              No posts yet.
            </div>
          </div>
        </div>
        <div
          className="fp-next-page-button"
        >
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--fab"
          >
            <i
              className="material-icons"
            >expand_more</i>
          </button>
        </div>
      </section>
    );
  }
}

export default UserProfile;
