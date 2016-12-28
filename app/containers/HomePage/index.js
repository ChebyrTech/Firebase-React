import React from 'react';
import Header from './../../components/Header';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Header />
        <main className="mdl-layout__content mdl-color--grey-100" >
          {/* Show a feed of posts */}
          <section id="page-feed" className="mdl-grid fp-content" >{/* style="display: none;" */}
            <div className="fp-new-posts-button" >
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400"
              >
                Show new posts...
              </button>
            </div>
            <div
              className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid"
            >
              <div
                className="fp-no-posts fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet
                    mdl-cell--8-col-desktop mdl-grid mdl-grid--no-spacing"
              >
                <div
                  className="mdl-card__supporting-text mdl-color-text--grey-600"
                >
                  <i className="fp-info material-icons" >help</i>
                  <div>
                    <p>Start following people to see their posts!</p>
                    <p>
                      Use the <strong><i className="material-icons" >search</i> search bar</strong>
                      to find people you know and have
                      a look at the <a href="/feed" ><i className="material-icons" >trending_up</i>
                      feed</a> to discover interesting people.
                    </p>
                    <p>Then <i className="material-icons" >favorite</i> like and comment their posts!
                    </p>
                  </div>
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

          {/* Show a single post with comments*/}
          <section id="page-post" className="mdl-grid fp-content" style={{ display: 'block' }} >
            <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid" ></div>
          </section>

          {/* Show a single post with comments*/}
          <section id="page-about" className="mdl-grid fp-content" style={{ display: 'block' }} >
            <div
              className="fp-help mdl-card mdl-shadow--2dp mdl-cell
                  mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
            >
              <div
                className="mdl-card__supporting-text mdl-color-text--grey-600"
              >
                <i className="fp-info material-icons" >info</i>
                <div>
                  <p>Friendly Pix is a photo sharing app showcasing the use of the <a
                    href="https://firebase.google.com"
                  >Firebase Platform</a>.</p>
                </div>
              </div>
            </div>
            <div
              className="fp-help mdl-card mdl-shadow--2dp mdl-cell
                  mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
            >
              <div
                className="mdl-card__supporting-text mdl-color-text--grey-600"
              >
                <i
                  className="fp-info material-icons"
                >help</i>
                <div>
                  <p>Start following people to see their posts in your <a href="/" ><i
                    className="material-icons"
                  >home</i>home</a>!</p>
                  <p>
                    Use the <strong><i className="material-icons" >search</i>search bar</strong> to
                    find people you know and have
                    a look at the <a href="/feed" ><i className="material-icons" >trending_up</i>feed</a>
                    to discover interesting people.
                  </p>
                  <p>Then <i className="material-icons" >favorite</i>like and comment their posts!</p>
                  <p>
                    Share your pics with your friends using the <i className="material-icons" >file_upload</i>or
                    <i
                      className="material-icons"
                    >photo_camera</i>buttons.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="fp-help mdl-card mdl-shadow--2dp mdl-cell
                  mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
            >
              <div
                className="mdl-card__supporting-text mdl-color-text--grey-600"
              >
                <i
                  className="fp-info material-icons"
                >contacts</i>
                <div>
                  <p>Feel free to file issues on our <a
                    href="https://github.com/firebase/friendlypix"
                  >GitHub repo</a>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* User Profile page */}
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

          {/* Post new pic page  */}
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

          {/* Toast */ }
          <div
            aria-live="assertive" aria-atomic="true" aria-relevant="text"
            className="mdl-snackbar mdl-js-snackbar"
          >
            <div className="mdl-snackbar__text" ></div>
            <button type="button" className="mdl-snackbar__action" ></button>
          </div>
        </main>
      </div>
    );
  }
}
