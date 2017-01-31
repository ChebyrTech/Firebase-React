import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../actions/appActions.js'

import authReducer from '../reducers/auth.js'

import Search from './search.jsx'

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
            navClasses: {
                home: 'is-active',
                feed: '',
                about: ''
            },
            mounted: false
        }

        this.auth = firebase.auth();
        this.signOutHandler = this.signOutHandler.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.switchNavClass = this.switchNavClass.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);

    }



    // upgrade the DOM for correct rendering of Material Design Lite components 
    componentDidMount() {
        this.setState({
            mounted: true
        })
        if (this.props.router.location.pathname == '/feed') {
            this.setState({
                navClasses: {
                    home: '',
                    feed: 'is-active',
                    about: ''
                }
            })
        }

        componentHandler.upgradeDom();

    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
        //  FirebaseHandler.cancelAllSubscriptions(); 
    }

    componentWillUnmount() {

        this.setState({
            mounted: false
        })
        function clear() {
            return;
        }
        // this.handleAuthChange = clear; 
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.router.location.pathname != '/' && nextProps.router.location.pathname != '/feed' && this.state.mounted) {
            this.setState({
                navClasses: {
                    home: '',
                    feed: '',
                    about: ''
                }
            })
        }
        else if (nextProps.router.location.pathname == '/feed' && this.state.mounted) {
            this.setState({
                navClasses: {
                    home: '',
                    feed: 'is-active',
                    about: ''
                }
            })
        }

        if (nextProps.user.signOut || nextProps.user.uid == '' && this.state.mounted) {

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

        if (nextProps.params.uid != this.props.params.uid && nextProps.params.uid && this.props.params.uid && this.state.mounted) {

            console.log(nextProps.params.uid)
            window.location.reload();
        }

        if (nextProps.user.uid !== '' && this.state.mounted) {

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

                // reset field value 
                e.target.type = '';
                e.target.type = 'file';

                var self = this;
                reader.onload = function (e) {

                    self.props.uploadImage(file, e.target.result);
                    self.props.router.push('/add'); // go to upload page   


                }
            }
        }
    }

    /**
   * Sign out 
   */
    signOutHandler(drawerOpen) {

        if (drawerOpen) {
            this.closeDrawer();
        }
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


    /**
     * Switch navbar tab classes 
     */
    switchNavClass(active_route) {
        if (active_route == 'home') {
            this.setState({
                navClasses: {
                    home: 'is-active',
                    feed: '',
                    about: ''
                }
            })

        } else if (active_route == 'feed') {
            this.setState({
                navClasses: {
                    home: '',
                    feed: 'is-active',
                    about: ''
                }
            })
        } else if (active_route == 'about') {

            this.setState({
                navClasses: {
                    home: '',
                    feed: '',
                    about: 'is-active'
                }
            })
        }
    }

    closeDrawer(route) {

        this.switchNavClass(route);

        const drawerObfuscator = document.querySelector('.mdl-layout__obfuscator');
        if (drawerObfuscator.classList.contains('is-visible')) {

            var click = new MouseEvent('click');
            drawerObfuscator.dispatchEvent(click);
        }

    }

    render() {
        return (


            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" id="content">
                <header className="fp-header mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
                    <div className="mdl-layout__header-row fp-titlebar">

                        {/*logo */}
                        <h3 className="fp-logo"><Link to="/feed"><span><i className="material-icons">photo</i> Friendly Pix</span></Link></h3>
                        <div className="mdl-layout-spacer"></div>

                        {/*search bar */}
                        <Search />

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
                        <div className="mdl-tab">
                            <a href="#/" onClick={() => this.switchNavClass('home')} id="fp-menu-home" className={"mdl-layout__tab fp-signed-in-only mdl-button mdl-js-button mdl-js-ripple-effect " + this.state.navClasses.home} style={this.state.signedInOnlyStyle}><i className="material-icons">home</i> Home</a>
                            <a href='#/feed' onClick={() => this.switchNavClass('feed')} id="fp-menu-feed" className={"mdl-layout__tab mdl-button mdl-js-button mdl-js-ripple-effect " + this.state.navClasses.feed}><i className="material-icons">trending_up</i> Feed</a>

                            <label className="fp-signed-in-only mdl-button mdl-js-button mdl-button--fab mdl-cell--hide-tablet mdl-color--amber-400 mdl-shadow--4dp mdl-js-ripple-effect" id="add" style={this.state.signedInOnlyStyle}>
                                <i className="material-icons">file_upload</i>
                                <input onChange={this.handleUpload} id="fp-mediacapture" type="file" accept="image/*;capture=camera" />
                            </label>
                        </div>
                    </div>

                    <label className="fp-signed-in-only mdl-cell--hide-desktop mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-color--amber-400 mdl-shadow--4dp" id="add-floating" style={this.state.signedInOnlyStyle}>
                        <i className="material-icons">photo_camera</i>
                        <input onChange={this.handleUpload} id="fp-mediacapture-sm" type="file" accept="image/*;capture=camera" />
                    </label>

                </header>



                {/*  drawer menu  */}
                <div className="mdl-cell--hide-desktop mdl-cell--hide-tablet mdl-layout__drawer">
                    <a href="/" className="fp-signed-out-only"><button className="fp-sign-in-button mdl-button mdl-js-button mdl-js-ripple-effect" style={this.state.signedOutOnlyStyle}><i className="material-icons">account_circle</i> Sign in</button></a>
                    <div className="fp-signed-in-user-container mdl-color--light-blue-700 fp-signed-in-only" style={this.state.signedInOnlyStyle}>
                        <Link to={"/user/" + this.props.user.uid} onClick={this.closeDrawer}><span className="fp-usernamelink">
                            <div className="fp-avatar" style={this.state.avatarStyle}></div>
                            <div className="fp-username mdl-color-text--white">{this.props.user.displayName}</div>
                        </span></Link>
                    </div>
                    <nav className="mdl-navigation">
                        <a className={"mdl-navigation__link fp-signed-in-only " + this.state.navClasses.home} href="#/" style={this.state.signedInOnlyStyle} onClick={() => { this.closeDrawer('home') } }><i className="material-icons">home</i> Home</a>
                        <a className={"mdl-navigation__link " + this.state.navClasses.feed} href="#/feed" onClick={() => { this.closeDrawer('feed') } }><i className="material-icons">trending_up</i> Feed</a>
                        <hr />
                        <a className={"mdl-navigation__link " + this.state.navClasses.about} href="#/about" onClick={() => { this.closeDrawer('about') } }><i className="material-icons">perm_contact_calendar</i> About - Help - Contact</a>
                        <hr className="fp-signed-in-only" style={this.state.signedInOnlyStyle} />
                        <a className="fp-sign-out mdl-navigation__link fp-signed-in-only" style={this.state.signedInOnlyStyle} onClick={() => this.signOutHandler(true)}><i className="material-icons">exit_to_app</i> Sign Out</a>
                    </nav>
                </div>
                <main className="mdl-layout__content mdl-color--grey-100">
                    {/* Display routes */}
                    {this.props.children}
                </main>
            </div>
        )
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