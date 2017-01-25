import React from 'react' 

export default class SinglePost extends React.Component { 

    constructor(props) {
        super(props)
    }

    /**
     * Given the time of creation of a post returns how long since the creation of the post in text
     * format. e.g. 5d, 10h, now...
     */
    getTimeText(postCreationTimestamp) {
        let millis = Date.now() - postCreationTimestamp;
            const ms = millis % 1000;
            millis = (millis - ms) / 1000;
            const secs = millis % 60;
            millis = (millis - secs) / 60;
            const mins = millis % 60;
            millis = (millis - mins) / 60;
            const hrs = millis % 24;
            const days = (millis - hrs) / 24;
            var timeSinceCreation = [days, hrs, mins, secs, ms];

            let timeText = 'Now';
            if (timeSinceCreation[0] !== 0) {
            timeText = timeSinceCreation[0] + 'd';
            } else if (timeSinceCreation[1] !== 0) {
            timeText = timeSinceCreation[1] + 'h';
            } else if (timeSinceCreation[2] !== 0) {
            timeText = timeSinceCreation[2] + 'm';
            }
            return timeText;
    }
     

    /**
     * Returns the HTML for a post's comment.
     */
        createCommentHtml(author, text) {
            return `
                <div class="fp-comment">
                    <a class="fp-author" href="/user/${author.uid}">${author.displayName || 'Anonymous'}</a>:
                    <span class="fp-text">${text}</span>
                </div>
                `
    }


    render () {
        return (

            <section id="page-post" className="mdl-grid fp-content">
                <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
                    <div className="fp-post mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--8-col-desktop mdl-grid mdl-grid--no-spacing">
                        <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                            <div className="fp-header">
                                <a className="fp-usernamelink mdl-button mdl-js-button" href="/user/">
                                    <div className="fp-avatar"></div>
                                    <div className="fp-username mdl-color-text--black"></div>
                                </a>

                                <button className="fp-delete-post mdl-button mdl-js-button">
                                    Delete
                                </button>
                                <a href="/post/" className="fp-time">now</a>
                            </div>
                            <div className="fp-image"></div>
                            <div className="fp-likes">0 likes</div>
                            <div className="fp-first-comment"></div>
                            <div className="fp-morecomments">View more comments...</div>
                            <div className="fp-comments"></div>
                            <div className="fp-action">
                                <span className="fp-like">
                                    <div className="fp-not-liked material-icons">favorite_border</div>
                                    <div className="fp-liked material-icons">favorite</div>
                                </span>
                                <form className="fp-add-comment" action="#">
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" type="text" />
                                        <label className="mdl-textfield__label">Comment...</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        )
    }
}