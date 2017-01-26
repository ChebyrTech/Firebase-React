import React from 'react'  

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux' 


class Theatre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewModeChanged: 0
        }
    } 

    componentWillReceiveProps(newProps) {
        if (newProps.picUrl != '' && newProps.index != this.props.index) {
            this.enterTheatreMode(this);
        }
    }

    // Leave theatre mode 
    leaveTheatreMode(self) { 
        
        document.querySelector('.fp-theatre-fullpic').classList.remove('theatre-show'); 
        document.querySelector('.fp-theatre-fullpic').classList.add('theatre-hide'); 
        document.removeEventListener('keydown', self.escHandler); 
    

    }

    escHandler(e) {

        if (e.which === 27) {
            document.querySelector('.fp-theatre-fullpic').classList.remove('theatre-show'); 
            document.querySelector('.fp-theatre-fullpic').classList.add('theatre-hide'); 
        }
        
    }

    // Enter theatre mode 
    enterTheatreMode(self)  { 

        var timestamp = () => new Date.getTime(); 
    
        if (timestamp - self.state.viewModeChanged < 300 ) return

        document.querySelector('.fp-theatre-fullpic').classList.remove('theatre-hide'); 
        document.querySelector('.fp-theatre-fullpic').classList.add('theatre-show'); 
        self.setState({
            viewModeChanged: timestamp
        }) 

        document.addEventListener('keydown', self.escHandler); 

    } 

    render() {
        return(
            <div className="fp-theatre fp-theatre-fullpic theatre-hide" onClick={()=>{this.leaveTheatreMode(this)}}><img className="fp-fullpic" src={this.props.picUrl}/></div>
        )
    }
} 

function mapStateToProps (state) {
    return {
        picUrl: state.feed.picUrl, 
        index: state.feed.index
    }
}

export default connect(mapStateToProps)(Theatre)