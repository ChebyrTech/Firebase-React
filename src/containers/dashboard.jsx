import React from 'react' 

import Header from './header.jsx' 

import store from '../store.js'; 

class Dashboard extends React.Component {

constructor(props) {
    super(); 
    this.state = {
        user: {
            uid: '', 
            photoUrl: '',
            displayName: ''
        }
    }

    var self = this; 
    store.subscribe(handleChange);

        let currentValue = {}; 
        function handleChange() {
        let previousValue = currentValue
        currentValue = store.getState().auth.uid; 

        if (previousValue !== currentValue && currentValue != '') {
                self.setState({user: store.getState().auth.user })
            }   
        }
}

render () {
        return (<div>
            <Header uid={this.state.user.uid} displayName={this.state.user.displayName} photoUrl={this.state.user.photoUrl} />
            {this.props.children}
        </div>)
    }   
}

export default Dashboard 