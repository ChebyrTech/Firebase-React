import React from 'react' 

export default class About extends React.Component {

    render() {
        return (

            <section id="page-about" class="mdl-grid fp-content" style="display: none;">
            <div class="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                <i class="fp-info material-icons">info</i>
                <div>
                    <p>Friendly Pix is a photo sharing app showcasing the use of the <a href="https://firebase.google.com">Firebase Platform</a>.</p>
                </div>
                </div>
            </div>
            <div class="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                <i class="fp-info material-icons">help</i>
                <div>
                    <p>Start following people to see their posts in your <a href="/"><i class="material-icons">home</i>home</a>!</p>
                    <p>
                    Use the <strong><i class="material-icons">search</i>search bar</strong> to find people you know and have
                    a look at the <a href="/feed"><i class="material-icons">trending_up</i>feed</a> to discover interesting people.
                    </p>
                    <p>Then <i class="material-icons">favorite</i>like and comment their posts!</p>
                    <p>
                    Share your pics with your friends using the <i class="material-icons">file_upload</i>or <i class="material-icons">photo_camera</i>buttons.
                    </p>
                </div>
                </div>
            </div>
            <div class="fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                <i class="fp-info material-icons">contacts</i>
                <div>
                    <p>Feel free to file issues on our <a href="https://github.com/firebase/friendlypix">GitHub repo</a>.</p>
                </div>
                </div>
            </div>
            </section>
            
        )
    }
}