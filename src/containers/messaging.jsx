import React from 'react'
import FirebaseHandler from '../firebase/firebase'  

import {withRouter} from 'react-router' 

import * as appActions from '../actions/appActions' 
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'  

class Messaging extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        checked: false, 
        disabled: false, 
        text: 'Enable Notifications', 
        cls: '', 
        val: false  
      }
        // Firebase SDK
        this.database = firebase.database();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.messaging = firebase.messaging(); 

      this.saveToken = this.saveToken.bind(this); 
      this.requestPermission = this.requestPermission.bind(this); 
      this.onEnableNotificationsChange = this.onEnableNotificationsChange.bind(this); 
      this.onMessage = this.onMessage.bind(this); 
      this.trackNotificationsEnabledStatus = this.trackNotificationsEnabledStatus.bind(this); 
      this.setSwitchState = this.setSwitchState.bind(this); 

    } 

    componentDidMount() {
      this.auth.onAuthStateChanged(() => this.trackNotificationsEnabledStatus());
      this.messaging.onTokenRefresh(() => this.saveToken());
      this.messaging.onMessage(payload => this.onMessage(payload)); 
      
    } 

    componentWillUnmount() {
      function clear() {
        return; 
      }

      this.trackNotificationsEnabledStatus = clear; 
    }
  

  /**
   * Saves the token to the database if available. If not request permissions.
   */
  saveToken() {
    this.messaging.getToken().then(currentToken => {
      if (currentToken) {
        FirebaseHandler.saveNotificationToken(currentToken).then(() => {
          console.log('Notification Token saved to database');
        });
      } else {
        this.requestPermission();
      }
    }).catch(err => {
      console.error('Unable to get messaging token.', err);
    });
  }

  /**
   * Requests permission to send notifications on this browser.
   */
  requestPermission() {
    console.log('Requesting permission...');
    this.messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
      this.saveToken();
    }).catch(err => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  /**
   * Called when the app is in focus.
   */
  onMessage(payload) {
    console.log('Notifications received.', payload);

    var self = this; 
    // If we get a notification while focus on the app
    if (payload.notification) {
      const userId = payload.notification.click_action.split('/user/')[1];

      let data = {
        message: payload.notification.body,
        actionHandler: () => {
          if (typeof self.props.params != 'undefined') {
            self.props.router.push(`/user/${userId}`)
            window.location.reload(); 
          } else {
            self.props.router.push(`/user/${userId}`)
          }
        },
        actionText: 'Profile',
        timeout: 10000
      };
      this.props.showNotification(data); 
    }
  }

  /**
   * Triggered when the user changes the "Notifications Enabled" checkbox.
   */
  onEnableNotificationsChange(e) {

    var checked = e.target.checked; 

  
    this.setState({
      disabled: true
    })


    return FirebaseHandler.toggleNotificationEnabled(checked);
  }

  /**
   * Starts tracking the "Notifications Enabled" checkbox status.
   */
  trackNotificationsEnabledStatus() {
    if (this.auth.currentUser) {
      FirebaseHandler.registerToNotificationEnabledStatusUpdate(data => this.setSwitchState(data));
    }
  } 

/**
 *  Refresh notifications switch state 
 */
  setSwitchState(data) {

    var checkbox = document.getElementById('notifications'); 

    if (data.val() !== null) {
      checkbox.checked = true; 

      this.setState({
         disabled: false, 
         text: 'Notifications Enabled', 
         cls: 'is-checked'
      }) 

      this.saveToken();
    } else { 

      checkbox.checked = false; 
   
      this.setState({

        disabled: false, 
        text: 'Enable Notifications', 
        cls: ''
      }) 
    } 
  }

  render() {
    return (
  <label className={"fp-notifications mdl-switch mdl-js-switch mdl-js-ripple-effect " + this.state.cls} htmlFor="notifications" style={this.props.style}>
        <input type="checkbox" id="notifications" className="mdl-switch__input" onChange={this.onEnableNotificationsChange} disabled={this.state.disabled}/>
        <span className="mdl-switch__label">{this.state.text}</span>
        </label>
    )
  }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      showNotification: appActions.showNotification
    }, dispatch)
}

export default connect(null, matchDispatchToProps)(Messaging) 