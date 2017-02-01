import firebase from 'firebase/app'
import firebaseui from 'firebaseui'

window.firebase = firebase; 

export default (function() {

    // Firebase config
    var config = {
        apiKey: "AIzaSyABYJsdr5VmLjnG0tT1tIzxvHWyyl4f5AQ",
        authDomain: "test-9deeb.firebaseapp.com",
        databaseURL: "https://test-9deeb.firebaseio.com",
        storageBucket: "test-9deeb.appspot.com",
        messagingSenderId: "710979781664"

    }; 


  firebase.initializeApp(config); 
  
   // FirebaseUI config.
    var uiConfig = {
    'signInFlow': 'popup',
    'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ], 
    'callbacks': {
        signInSuccess: function() {

            // prevent automatic redirects after signin
            return false; 
        }}
    };

    window.uiConfig = uiConfig; 
  
})()








