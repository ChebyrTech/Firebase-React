import React from 'react' 

export default class Header extends React.Component {
    render() {
        return (<div>
        
        <header className="fp-header mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
            <div className="mdl-layout__header-row fp-titlebar">

            {/*logo */}
            <h3 className="fp-logo"><a href="/feed"><i className="material-icons">photo</i> Friendly Pix</a></h3>
            <div className="mdl-layout-spacer"></div>

            {/*search bar */}
            <div className="fp-searchcontainer mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="searchQuery">
                <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="searchQuery" />
                <label className="mdl-textfield__label" htmlFor="searchQuery">Enter your query...</label>
                </div>
                <div id="fp-searchResults" className="mdl-card mdl-shadow--2dp"></div>
            </div>

            {/*signed in user info */}
            <div className="mdl-cell--hide-phone">
                <a href="/"><button className="fp-sign-in-button fp-signed-out-only mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">account_circle</i> Sign in</button></a>
                <div className="fp-signed-in-user-container mdl-cell--hide-phone fp-signed-in-only">
                <a className="fp-usernamelink mdl-button mdl-js-button">
                    <div className="fp-avatar"></div>
                    <div className="fp-username mdl-color-text--white"></div>
                </a>
                </div>
            </div>

            {/*dropdown menu */}
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-cell--hide-phone" id="fp-menu">
                <i className="material-icons">more_vert</i>
            </button>
            <ul className="fp-menu-list mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="fp-menu">
                <a href="/about">
                <li className="mdl-menu__item"><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</li>
                </a>
                <li className="fp-sign-out mdl-menu__item fp-signed-in-only"><i className="material-icons">exit_to_app</i> Sign out</li>
            </ul>
            </div>

            {/*nav bar */}
            <div className="fp-tab mdl-layout__header-row mdl-cell--hide-phone mdl-color--light-blue-600">
            <div className="mdl-tab">
                <a href="/" id="fp-menu-home" className="mdl-layout__tab fp-signed-in-only is-active mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">home</i> Home</a>
                <a href="/feed" id="fp-menu-feed" className="mdl-layout__tab mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">trending_up</i> Feed</a>
                <input id="fp-mediacapture" type="file" accept="image/*;capture=camera" />
                <button className="fp-signed-in-only mdl-button mdl-js-button mdl-button--fab mdl-cell--hide-tablet mdl-color--amber-400 mdl-shadow--4dp mdl-js-ripple-effect" id="add">
                <i className="material-icons">file_upload</i>
                </button>
            </div>
            </div>
            <button className="fp-signed-in-only mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color--amber-400 mdl-shadow--4dp" id="add-floating">
            <i className="material-icons">photo_camera</i>
            </button>
        </header>
            
        </div>)
    }
}