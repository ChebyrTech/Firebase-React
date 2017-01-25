import React from 'react' 
import { withRouter } from 'react-router' 

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

import * as appActions from '../actions/appActions'

import FirebaseHandler from '../firebase'


class NewPost extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            overlayStyle: {
                display: 'none'
            }, 
            src: '', 
            caption: '', 
            filename: '',
            uploadUiStyle: true

        } 


        this.valueChangeHandler = this.valueChangeHandler.bind(this);  
        // this.disableUploadUi = this.disableUploadUi.bind(this);
    }


  
    componentWillReceiveProps(nextProps) { 

        // handle file data 
        if (this.state.src == '' || nextProps.upload.index != this.props.upload.index) {

            this.setState({filename: nextProps.file.filename}); 

            var self = this; 

            console.log(nextProps)
            var image_promise = nextProps.file.image.then(function(result) { 
                
                self.setState({src: result})

            }) 
        }
        

        if ("successData" in nextProps.upload && nextProps.upload.successData != this.props.upload.successData) {
            // redirect to user profile page if file upload was successful 
            this.props.router.push(`/user/${this.props.uid}`); 
        }
    }

    // upgrade the DOM for correct rendering of Material Design Lite components 
    componentDidMount () { 

        if (this.props.file.filename == '') {
            this.props.router.push('/');
        }
        componentHandler.upgradeDom();

    }

    componentDidUpdate () {
        componentHandler.upgradeDom();
    }


  /**
   * Returns a Canvas containing the given image scaled down to the given max dimension.
   */
    _getScaledCanvas(image, maxDimension) { 

            const thumbCanvas = document.createElement('canvas');
            if (image.width > maxDimension ||
                image.height > maxDimension) { 

            if (image.width > image.height) {
                thumbCanvas.width = maxDimension;
                thumbCanvas.height = maxDimension * image.height / image.width; 

            } else {
                thumbCanvas.width = maxDimension * image.width / image.height;
                thumbCanvas.height = maxDimension;
                }
            } else {
                thumbCanvas.width = image.width;
                thumbCanvas.height = image.height;
            } 

            thumbCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height,
            0, 0, thumbCanvas.width, thumbCanvas.height);
            return thumbCanvas; 

    }


  /**
   * Generates the full size image and image thumb using canvas and returns them in a promise.
   */
    generateImages(url, ref) { 

        const image = new Image();
        image.src = url;  

        // image specs
        const FULL_IMAGE_SPECS = {

            maxDimension: 1280,
            quality: 0.9
            
        }
        const THUMB_IMAGE_SPECS = {
            maxDimension: 640,
            quality: 0.7
            
        }

        function resolveBlob(blob) {
            return blob;                 
        }


        return new Promise(function(resolve, reject) { 

            var blobs = {
                full: '', 
                thumb: ''
            }

            const maxThumbDimension = THUMB_IMAGE_SPECS.maxDimension;
            const thumbCanvas = ref._getScaledCanvas(image, maxThumbDimension); 
            thumbCanvas.toBlob(function(blob) {
                blobs.thumb = blob;  

                const maxFullDimension = FULL_IMAGE_SPECS.maxDimension;
                const fullCanvas = ref._getScaledCanvas(image, maxFullDimension);
                fullCanvas.toBlob(function(blob) {

                    blobs.full = blob;  
                    resolve(blobs)

                }, 'image/jpeg', FULL_IMAGE_SPECS.quality);
            }, 'image/jpeg', THUMB_IMAGE_SPECS.quality); 
            
        }); 
    }  
    
  
  /**
   * Uploads a picture to firebase database 
   */ 
    uploadPic(img, self) {
        console.log(arguments)
        self.disableUploadUi(true);
        var imageCaption = document.getElementById('imageCaptionInput').value; 

        // show overlay 
        self.setState({
            overlayStyle: {
                display: 'flex'
            }
        }); 


  
        self.generateImages(img, self).then(pics => {
            // Upload the File upload to Firebase Storage and create new post. 

         
            FirebaseHandler.uploadNewPic(pics.full, pics.thumb, self.state.caption, self.state.caption).then(postId => { 

                var data = {
                message: 'New pic has been posted!',
                actionHandler: () => {
                    self.props.router.push(`/post/${postId}`); 
                },
                actionText: 'View',
                timeout: 10000, 
                postid: postId
                }; 

                // Enable upload UI
                self.disableUploadUi(false);

                // Generate upload success event
                self.props.uploadSuccess(data); 


            }, error => {
                console.error(error);
                var data = {
                message: `There was an error while posting your pic. Sorry!`,
                timeout: 5000
                };
    
                // Enable upload UI 
                self.disableUploadUi(false);

                // Generate upload error event 
                self.props.uploadError(data); 
            })
        })
    
    } 

    // Disable or enable upload UI 
    disableUploadUi(dir) {
        if (dir) {
          this.setState({
                uploadUiStyle: true
            })
        } else {
            this.setState({
                uploadUiStyle: false
            })
        }
    }

    // Capture ImageCaption input value 
    valueChangeHandler(e) {
        this.setState({caption: e.target.value});  
        if (this.state.caption.length > 0) {
            this.setState({
                uploadUiStyle: false
            })
        } else {
            this.setState({
                uploadUiStyle: true
            }) 
        }
    }

    render() {
        return (
            <section id="page-add" className="mdl-grid fp-content">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--no-spacing">
                    <div className="fp-addcontainer mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                        <div className="fp-overlay" style={this.state.overlayStyle}>
                            <i className="material-icons">hourglass_full</i>
                        </div>
                        <img id="newPictureContainer" src={this.state.src} />
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                            <form id="uploadPicForm" action="#">

                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input autoFocus className="mdl-textfield__input" type="text" id="imageCaptionInput" onChange={this.valueChangeHandler} value={this.state.caption}/>
                                    <label className="mdl-textfield__label" htmlFor="imageCaptionInput">Image caption...</label>
                                </div>

                                <br />
                                <button disabled={this.state.uploadUiStyle} onClick={() => { this.uploadPic(this.state.src, this) } } type="submit" className="fp-upload mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400">
                                    Upload this pic!
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

} 

function mapStateToProps(state) {
    return {
        file: state.upload, 
        uid: state.auth.user.uid, 
        upload: state.upload
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        uploadSuccess: appActions.uploadSuccess, 
        uploadError: appActions.uploadError 
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(NewPost)) 