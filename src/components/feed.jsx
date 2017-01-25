import React from 'react' 
import {Link} from 'react-router'

export default class Feed extends React.Component {

    render () {
        return (

            <section id="page-feed" className="mdl-grid fp-content">
                <div className="fp-new-posts-button">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400">
                        Show new posts...
                    </button>
                </div>
                <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
                    <div className="fp-no-posts fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--8-col-desktop mdl-grid mdl-grid--no-spacing">
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                            <i className="fp-info material-icons">help</i>
                            <div>
                                <p>Start following people to see their posts!</p>
                                <p>
                                    Use the <strong><i className="material-icons">search</i> search bar</strong> to find people you know and have
                                    a look at the <a href="/feed"><i className="material-icons">trending_up</i> feed</a> to discover interesting people.
                                </p>
                                <p>Then <i className="material-icons">favorite</i> like and comment their posts!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fp-next-page-button">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--fab">
                        <i className="material-icons">expand_more</i>
                    </button>
                </div>
            </section>
        )
    }
}
