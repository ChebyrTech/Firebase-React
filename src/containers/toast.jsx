import React from 'react'

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'


class Toast extends React.Component {

    constructor(props) {
        super(props) 

        
    }

    componentWillReceiveProps(newProps) { 


        if ("successData" in newProps.upload)  {

            // show snackbar if the image was uploaded successfully 
            if (typeof this.props.successData == 'undefined' || newProps.upload.successData.postid != this.props.successData.postid) {
                document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.successData);
            }
        
        }  else if ("errorData" in newProps.upload) {

            // show snackbar error message 
            if (typeof newProps.errorData == 'undefined' || newProps.upload.errorData.index != this.props.upload.errorData.index ) {
                document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar.showSnackbar(newProps.upload.errorData);
            }
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
        upload: state.upload
    }
}

export default connect(mapStateToProps)(Toast) 