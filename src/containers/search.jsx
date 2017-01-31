import React from 'react' 
import {withRouter} from 'react-router' 

import FirebaseHandler from '../firebase' 

class Search extends React.Component { 

    constructor(props) {
      super(props) 

      this.state = {
        val: '', 
        results: [], 
        cls: '', 
        resultStyle: {
          display: 'none'
        }, 
        mounted: false
      }

      // Firebase SDK.
      this.database = firebase.database();

      this.displaySearchResults = this.displaySearchResults.bind(this);  
      this.handleSearchResults = this.handleSearchResults.bind(this);  
      this.hideSearchResults = this.hideSearchResults.bind(this);  
      this.createSearchResultJsx = this.createSearchResultJsx.bind(this); 
      this.hrefHandler = this.hrefHandler.bind(this); 

      this.MIN_CHARACTERS = 3; 
      this.NB_RESULTS_LIMIT = 10; 
    } 

    componentDidMount() {

      this.setState({
        mounted: true
      })
      componentHandler.upgradeDom();
    }

    componentDidUpdate() { 
      
      componentHandler.upgradeDom(); 
    }

    componentWillUnmount() {
      
      this.setState({
        mounted: false
      })
    }

    hideSearchResults(listener) {
        this.setState({
            cls: ''
        }); 

        var self = this; 
        setTimeout(() => {
          document.removeEventListener('click', listener); 

          if (self.state.mounted) {
            self.setState({
              resultStyle: {
                display: 'none'
              }
            })
          }

        }, 500)

        
      } 
    


  /**
   * Display search results.
   */
  displaySearchResults(e) { 

    this.setState({
      val: e.target.value
    })

    var self = this; 
    const searchString = this.state.val.toLowerCase().trim();

    console.log(searchString)
    if (searchString.length >= this.MIN_CHARACTERS) {
      FirebaseHandler.searchUsers(searchString, self.NB_RESULTS_LIMIT).then(
          results => {
              this.handleSearchResults(results); 
          });
    } else {
      self.setState({
        results: [], 
        cls: '', 
        resultStyle: {
          display: 'none'
        }
      })
    }
  } 

  handleSearchResults(results) {

    var self = this; 
    const peopleIds = Object.keys(results);
    if (peopleIds.length > 0) {
      self.setState({        
        resultStyle: {
          display: 'block'
        }

      }) 
      setTimeout(() => {

        if (self.state.mounted) {
          self.setState({        
            cls: 'search-visible'

          })
        }

      }, 300)

      function handleClick() {
        self.hideSearchResults(handleClick); 
      }

      document.addEventListener('click', handleClick); 

      var results_arr = []; 
      peopleIds.forEach(peopleId => {
        var profile = results[peopleId];
        var profileJsx = self.createSearchResultJsx(peopleId, profile); 
        results_arr.push(profileJsx); 

      })

      console.log(results_arr)
        self.setState({
          results: results_arr
        })

    
    } else {
      self.setState({
          cls: '', 
          resultStyle: {
            display: 'none'
          }
      })
    }
  } 


  hrefHandler(uid) {
    this.props.router.push('/user/' + uid)
  }

  /**
   * Returns the Jsx for a single search result
   */
   createSearchResultJsx(peopleId, peopleProfile) {

    var avatar_style = {
        backgroundImage: `url(${peopleProfile.profile_picture || '/images/silhouette.jpg' })`
    }

    return (
      <a key={peopleId} className={"fp-searchResultItem fp-usernamelink mdl-button mdl-js-button search-fadeout" + this.state.cls} onClick={() => {this.hrefHandler(peopleId)}}>
        <div className="fp-avatar" style={avatar_style}></div>
        <div className="fp-username mdl-color-text--black">{peopleProfile.full_name}</div>
      </a>
      )
  }


  render() {
    return (
      <div className="fp-searchcontainer mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="searchQuery">
          <i className="material-icons">search</i>
        </label>
        <div className="mdl-textfield__expandable-holder">
          <input className="mdl-textfield__input" type="text" id="searchQuery" onChange={this.displaySearchResults} value={this.state.val}/>
          <label className="mdl-textfield__label" htmlFor="searchQuery">Enter your query...</label>
        </div>
        <div id="fp-searchResults" style={this.state.resultStyle} className={"mdl-card mdl-shadow--2dp search-fadeout " + this.state.cls}>{
          this.state.results.map(profile => {
              return profile; 
          })
        }</div>
      </div>

    )
  }
}

export default withRouter(Search) 