// Handle all firebase interactions in one file 

class FirebaseHandler {

    constructor() {

        // Firebase SDK 
        this.database = firebase.database();
        this.storage = firebase.storage();
        this.auth = firebase.auth();

    }

    uploadNewPic(pic, thumb, fileName, text) {
    // Get a reference to where the post will be created.
    const newPostKey = this.database.ref('/posts').push().key;

    // Start the pic file upload to Firebase Storage.
    const picRef = this.storage.ref(`${this.auth.currentUser.uid}/full/${newPostKey}/${fileName}`);
    const metadata = {
      contentType: pic.type
    };
    var picUploadTask = picRef.put(pic, metadata).then(snapshot => {
      console.log('New pic uploaded. Size:', snapshot.totalBytes, 'bytes.');
      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);
      return url;
    }).catch(error => {
      console.error('Error while uploading new pic', error);
    });

    // Start the thumb file upload to Firebase Storage.
    const thumbRef = this.storage.ref(`${this.auth.currentUser.uid}/thumb/${newPostKey}/${fileName}`);
    var tumbUploadTask = thumbRef.put(thumb, metadata).then(snapshot => {
      console.log('New thumb uploaded. Size:', snapshot.totalBytes, 'bytes.');
      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);
      return url;
    }).catch(error => {
      console.error('Error while uploading new thumb', error);
    });

    return Promise.all([picUploadTask, tumbUploadTask]).then(urls => {
      // Once both pics and thumbnails has been uploaded add a new post in the Firebase Database and
      // to its fanned out posts lists (user's posts and home post).
      const update = {};
      update[`/posts/${newPostKey}`] = {
        full_url: urls[0],
        thumb_url: urls[1],
        text: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        full_storage_uri: picRef.toString(),
        thumb_storage_uri: thumbRef.toString(),
        author: {
          uid: this.auth.currentUser.uid,
          full_name: this.auth.currentUser.displayName,
          profile_picture: this.auth.currentUser.photoURL
        }
      };
      update[`/people/${this.auth.currentUser.uid}/posts/${newPostKey}`] = true;
      update[`/feed/${this.auth.currentUser.uid}/${newPostKey}`] = true;
      return this.database.ref().update(update).then(() => newPostKey); 
    });
  }
}

export default new FirebaseHandler(); 
window.FirebaseHandler = new FirebaseHandler; 