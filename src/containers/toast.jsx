import React from 'react'

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

import * as appActions from '../actions/appActions'

class Toast extends React.Component {

    constructor(props) {
        super(props) 

        
    }

    componentWillReceiveProps(newProps) { 

        // user load error 
        if (newProps.userLoadError) {

            if ('message' in newProps.userLoadError) {
                document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.userLoadError); 
                this.props.clearUserError();  
            }
        }

        if ("successData" in newProps.upload)  {
  
            // show snackbar if the image was uploaded successfully 
            if (typeof this.props.successData == 'undefined' || newProps.upload.successData.postid != this.props.successData.postid) {
                if ('message' in newProps.upload.successData) {
                    document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.successData); 
                }
          
            }
        
        }  else if ("errorData" in newProps.upload) {

            // show snackbar error message  
            if (typeof newProps.errorData == 'undefined' || newProps.upload.errorData.index != this.props.upload.errorData.index ) { 
                  if ('message' in newProps.upload.errorData) {
                        document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.errorData); 
                        this.props.clearUploadError()
                  }
            }
        } 

        // error deleting post 
        if (newProps.deleteData) {
            if ('message' in newProps.deleteData)
            document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.deleteData); 
            this.props.errorHandled(); 

        } 

        
    }


    

    render() {
        return (

            <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar">
                <div className="mdl-snackbar__text"></div>
                <button type="button" className="mdl-snackbar__action"></button>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        upload: state.upload, 
        deleteData: state.feed.errorData, 
        userLoadError: state.user.errorData
    }
} 

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        errorHandled: appActions.errorHandled, 
        clearUserError: appActions.clearUserError, 
        clearUploadError: appActions.clearUploadError

       
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Toast) 