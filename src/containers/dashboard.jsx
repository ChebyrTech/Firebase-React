import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './header.jsx'

import Toast from './toast.jsx'


class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                uid: '',
                photoUrl: '',
                displayName: ''
            }
        }
    }

    componentWillReceiveProps(newProps) {

        if ("successData[postid]" in newProps.upload) {
            if (newProps.upload.successData.postid != this.props.successData.postid) {

            }
        }
    }


    render() {


        return (<div>

            <Header uid={this.props.user.uid} displayName={this.props.user.displayName} photoUrl={this.props.user.photoUrl} />
            <div className="content-container">
                {this.props.children}
            </div>
            <Toast />

        </div>)
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        upload: state.upload
    }
}


export default connect(mapStateToProps)(Dashboard)