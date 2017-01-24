import React from 'react' 
import {Link} from 'react-router'

export default class About extends React.Component {

    render() {
        return (

            <section id="page-about" className="mdl-grid fp-content">
            <div className="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <i className="fp-info material-icons">info</i>
                <div>
                    <p>Friendly Pix is a photo sharing app showcasing the use of the <a href="https://firebase.google.com">Firebase Platform</a>.</p>
                </div>
                </div>
            </div>
            <div className="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <i className="fp-info material-icons">help</i>
                <div>
                    <p>Start following people to see their posts in your <Link to="/"><span><i className="material-icons">home</i>home</span></Link>!</p>
                    <p>
                    Use the <strong><i className="material-icons">search</i>search bar</strong> to find people you know and have
                    a look at the <Link to="/feed"><span><i className="material-icons">trending_up</i>feed</span></Link> to discover interesting people.
                    </p>
                    <p>Then <i className="material-icons">favorite</i>like and comment their posts!</p>
                    <p>
                    Share your pics with your friends using the <i className="material-icons">file_upload</i>or <i className="material-icons">photo_camera</i>buttons.
                    </p>
                </div>
                </div>
            </div>
            <div className="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <i className="fp-info material-icons">contacts</i>
                <div>
                    <p>Feel free to file issues on our <a href="https://github.com/firebase/friendlypix">GitHub repo</a>.</p>
                </div>
                </div>
            </div>
            </section>
            
        )
    }
}