import React from 'react' 
import {withRouter} from 'react-router'

class Search extends React.Component { 

    constructor(props) {
        super(props) 

        
    }

    
  /**
   * The minimum number of characters to trigger a search.
   * @return {number}
   */
  static get MIN_CHARACTERS() {
    return 3;
  }

  /**
   * The maximum number of search results to be displayed.
   * @return {number}
   */
  static get NB_RESULTS_LIMIT() {
    return 10;
  }

  /**
   * Initializes the Friendly Pix search bar.
   */
  constructor() {
    // Firebase SDK.
    this.database = firebase.database();

    $(document).ready(() => {
      // DOM Elements pointers.
      this.searchField = $('#searchQuery');
      this.searchResults = $('#fp-searchResults');

      // Event bindings.
      this.searchField.keyup(() => this.displaySearchResults());
      this.searchField.focus(() => this.displaySearchResults());
      this.searchField.click(() => this.displaySearchResults());
    });
  }

  /**
   * Display search results.
   */
  displaySearchResults() {
    const searchString = this.searchField.val().toLowerCase().trim();
    if (searchString.length >= friendlyPix.Search.MIN_CHARACTERS) {
      friendlyPix.firebase.searchUsers(searchString, friendlyPix.Search.NB_RESULTS_LIMIT).then(
          results => {
            this.searchResults.empty();
            const peopleIds = Object.keys(results);
            if (peopleIds.length > 0) {
              this.searchResults.fadeIn();
              $('html').click(() => {
                $('html').unbind('click');
                this.searchResults.fadeOut();
              });
              peopleIds.forEach(peopleId => {
                const profile = results[peopleId];
                this.searchResults.append(
                    friendlyPix.Search.createSearchResultHtml(peopleId, profile));
              });
            } else {
              this.searchResults.fadeOut();
            }
          });
    } else {
      this.searchResults.empty();
      this.searchResults.fadeOut();
    }
  }

  /**
   * Returns the Jsx for a single search result
   */
  static createSearchResultJsx(peopleId, peopleProfile) {

    var avatar_style = {
        backgroundImage: `url(${peopleProfile.profile_picture || '/images/silhouette.jpg' })`
    }

    return (
        <a className="fp-searchResultItem fp-usernamelink mdl-button mdl-js-button" href="/user/${peopleId}">
            <div className="fp-avatar" style={}></div>
            <div className="fp-username mdl-color-text--black">${peopleProfile.full_name}</div>
        </a>)
   }


    render() {
        return (
            <div></div>
        )
    }
}

export default Search