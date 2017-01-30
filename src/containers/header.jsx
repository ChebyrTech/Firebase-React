import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../actions/appActions.js'

import authReducer from '../reducers/auth.js'

import { Link, withRouter } from 'react-router'

import FirebaseHandler from '../firebase'

class Header extends React.Component {

    constructor(props) {
        super(props)

        var self = this;


        this.state = {
            // set element style depending on auth state
            signedOutOnlyStyle: {
                display: 'block'
            },
            signedInOnlyStyle: {
                display: 'none'

            },
            avatarStyle: {
                backgroundImage: 'url()'
            },
            upload: {},
            tabClasses: {
                home: 'is-active',
                feed: ''
            },
            activeTab: 1
        }

        this.auth = firebase.auth(); 
        this.signOutHandler = this.signOutHandler.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }



    // upgrade the DOM for correct rendering of Material Design Lite components 
    componentDidMount() {

        var self = this;
        componentHandler.upgradeDom();

    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
      //  FirebaseHandler.cancelAllSubscriptions(); 
    } 

    componentWillUnmount() {

        function clear() {
            return; 
        }
        // this.handleAuthChange = clear; 
    }

    componentWillReceiveProps(nextProps) {

        // Set style depending on whether the user is logged in 
        if (nextProps.user.uid !== '' && nextProps.user.photoUrl != '') {

            this.setState({
                signedOutOnlyStyle: {
                    display: 'none'
                }
            });
            this.setState({
                signedInOnlyStyle: {
                    display: 'block'
                }
            });
            this.setState({
                avatarStyle: {
                    backgroundImage: 'url(' + nextProps.user.photoUrl + ')'
                }
            })

        }

        if (nextProps.params.uid != this.props.params.uid && nextProps.params.uid && this.props.params.uid) {

            console.log(nextProps.params.uid)
            window.location.reload();
        }

        if (nextProps.user.uid == '' && this.props.user.uid != '') {
            this.setState({
                signedOutOnlyStyle: {
                    display: 'block'
                }
            });
            this.setState({
                signedInOnlyStyle: {
                    display: 'none'
                }
            });
        }
    }

    /**
     * Start image upload 
     */
    handleUpload(e) {

        if (e.target.files.length > 0) {

            var file = e.target.files[0];
            if (file.type.match('image.*')) {
                var reader = new FileReader;
                reader.readAsDataURL(file);

                var self = this;
                reader.onload = function (e) {

                    self.props.uploadImage(file, e.target.result);
                    e.target.value = null;
                    self.props.router.push('/add'); // go to upload page 
                }
            }
        }
    }

    /**
   * Sign out 
   */
    signOutHandler() {

        firebase.auth().signOut();

        this.props.signOut();
        this.setState({
            signedOutOnlyStyle: {
                display: 'block'
            }
        });
        this.setState({
            signedInOnlyStyle: {
                display: 'none'
            }
        });
    }

    render() {
        return (<div>

            <header className="fp-header mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
                <div className="mdl-layout__header-row fp-titlebar">

                    {/*logo */}
                    <h3 className="fp-logo"><Link to="/feed"><span><i className="material-icons">photo</i> Friendly Pix</span></Link></h3>
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
                        <a href="/" style={this.state.signedOutOnlyStyle}><button className="fp-sign-in-button fp-signed-out-only mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">account_circle</i> Sign in</button></a>
                        <div className="fp-signed-in-user-container mdl-cell--hide-phone fp-signed-in-only" style={this.state.signedInOnlyStyle}>
                            <Link to={"user/" + this.props.user.uid}><span className="fp-usernamelink mdl-button mdl-js-button">
                                <div className="fp-avatar" style={this.state.avatarStyle}></div>
                                <div className="fp-username mdl-color-text--white">{this.props.user.displayName}</div>
                            </span>
                            </Link>
                        </div>
                    </div>

                    {/*dropdown menu */}
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-cell--hide-phone" id="fp-menu">
                        <i className="material-icons">more_vert</i>
                    </button>
                    <ul className="fp-menu-list mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="fp-menu">
                        <Link to="/about">
                            <li className="mdl-menu__item"><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</li>
                        </Link>
                        <li onClick={this.signOutHandler} className="fp-sign-out mdl-menu__item fp-signed-in-only" style={this.state.signedInOnlyStyle}><i className="material-icons">exit_to_app</i> Sign out</li>
                    </ul>
                </div>


                {/*nav bar */}
                <div className="fp-tab mdl-layout__header-row mdl-cell--hide-phone mdl-color--light-blue-600">

                    <div className="mdl-tab mdl-layout__tab-bar mdl-js-ripple-effect">
                        <a href="#/" className="mdl-layout__tab is-active mdl-js-button mdl-button"> <i className="material-icons">home</i> Home</a>
                        <a href="#feed" className="mdl-layout__tab mdl-js-button mdl-button"><i className="material-icons">trending_up</i> Feed</a>

                    </div>
                    {/* <div className="mdl-tab">
                       <a href="#/" id="fp-menu-home" className="mdl-layout__tab fp-signed-in-only is-active mdl-button mdl-js-button mdl-js-ripple-effect" style={this.state.signedInOnlyStyle}> <i className="material-icons">home</i> Home</a>
                       <a href="#/feed" id="fp-menu-feed" className="mdl-layout__tab mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">trending_up</i> Feed</a>

                        <label className="fp-signed-in-only mdl-button mdl-js-button mdl-button--fab mdl-cell--hide-tablet mdl-color--amber-400 mdl-shadow--4dp mdl-js-ripple-effect" id="add" style={this.state.signedInOnlyStyle}>
                            <i className="material-icons">file_upload</i>
                            <input onChange={this.handleUpload} id="fp-mediacapture" type="file" accept="image/*;capture=camera" />
                        </label>
                    </div>*/}

                </div>
           {/* <main className="mdl-layout__content">
                <section className="mdl-layout__tab-panel is-active" id="home">
                    <div className="page-content">Tab 1 Contents</div>
                </section>
                <section className="mdl-layout__tab-panel" id="feed">
                    <div className="page-content">Tab 2 Contents</div>
                </section>

            </main>*/}
                <label className="fp-signed-in-only mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color--amber-400 mdl-shadow--4dp" id="add-floating" style={this.state.signedInOnlyStyle}>
                    <i className="material-icons">photo_camera</i>
                    <input onChange={this.handleUpload} id="fp-mediacapture-sm" type="file" accept="image/*;capture=camera" />
                </label>
            </header>



                {/*  drawer menu  */}
                <div className="mdl-cell--hide-desktop mdl-cell--hide-tablet mdl-layout__drawer">
                    <a href="/" className="fp-signed-out-only"><button className="fp-sign-in-button mdl-button mdl-js-button mdl-js-ripple-effect"><i className="material-icons">account_circle</i> Sign in</button></a>
                    <div className="fp-signed-in-user-container mdl-color--light-blue-700 fp-signed-in-only">
                    <a className="fp-usernamelink">
                        <div className="fp-avatar"></div>
                        <div className="fp-username mdl-color-text--white"></div>
                    </a>
                    </div>
                    <nav className="mdl-navigation">
                    <a className="mdl-navigation__link is-active fp-signed-in-only" href="/"><i className="material-icons">home</i> Home</a>
                    <a className="mdl-navigation__link" href="/feed"><i className="material-icons">trending_up</i> Feed</a>
                    <hr />
                    <a className="mdl-navigation__link" href="/about"><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</a>
                    <hr className="fp-signed-in-only"/>
                    <a className="fp-sign-out mdl-navigation__link fp-signed-in-only"><i className="material-icons">exit_to_app</i> Sign Out</a>
                    </nav>
                </div>

        </div>)
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        uploadIndex: state.upload.index
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signOut: appActions.signOut,
        uploadImage: appActions.upload
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Header)) 