import FirebaseHandler from './firebase' 

class Messaging {
    constructor () {
        // Firebase SDK
        this.database = firebase.database();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.messaging = firebase.messaging(); 

      this.auth.onAuthStateChanged(() => this.trackNotificationsEnabledStatus());
      this.messaging.onTokenRefresh(() => this.saveToken());
      this.messaging.onMessage(payload => this.onMessage(payload));
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

    // If we get a notification while focus on the app
    if (payload.notification) {
      const userId = payload.notification.click_action.split('/user/')[1];

      let data = {
        message: payload.notification.body,
        actionHandler: () => page(`/user/${userId}`),
        actionText: 'Profile',
        timeout: 10000
      };
      this.toast[0].MaterialSnackbar.showSnackbar(data);
    }
  }

  /**
   * Triggered when the user changes the "Notifications Enabled" checkbox.
   */
  onEnableNotificationsChange() {
    const checked = this.enableNotificationsCheckbox.prop('checked');
    this.enableNotificationsCheckbox.prop('disabled', true);

    return FirebaseHandler.toggleNotificationEnabled(checked);
  }

  /**
   * Starts tracking the "Notifications Enabled" checkbox status.
   */
  trackNotificationsEnabledStatus() {
    if (this.auth.currentUser) {
      FirebaseHandler.registerToNotificationEnabledStatusUpdate(data => {
        this.enableNotificationsCheckbox.prop('checked', data.val() !== null);
        this.enableNotificationsCheckbox.prop('disabled', false);
        this.enableNotificationsLabel.text(data.val() ? 'Notifications Enabled' : 'Enable Notifications');
        friendlyPix.MaterialUtils.refreshSwitchState(this.enableNotificationsContainer);

        if (data.val()) {
          this.saveToken();
        }
      });
    }
  }

}

export default new Messaging() 