import React from 'react'

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

import * as appActions from '../actions/appActions'

class Toast extends React.Component {

    constructor(props) {
        super(props) 

        
    }

    componentWillReceiveProps(newProps) { 


        if ("successData" in newProps.upload)  {

            // show snackbar if the image was uploaded successfully 
            if (typeof this.props.successData == 'undefined' || newProps.upload.successData.postid != this.props.successData.postid) {
                document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.successData); 
                //this.props.clearSuccessData()
            }
        
        }  else if ("errorData" in newProps.upload) {

            // show snackbar error message 
            if (typeof newProps.errorData == 'undefined' || newProps.upload.errorData.index != this.props.upload.errorData.index ) {
                document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.errorData);
            }
        } 

        if (newProps.deleteData) {

            document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.deleteData); 
            this.props.errorHandled(); 

        } 

        if (newProps.userLoadError) {

            console.log(newProps)
            document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.userLoadError); 
            this.props.clearUserError();  
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
        clearUserError: appActions.clearUserError
       
    }, dispatch)
}

export default connect(mapStateToProps)(Toast) 