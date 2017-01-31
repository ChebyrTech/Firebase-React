import React from 'react'
import { Link, withRouter } from 'react-router'

import Theatre from './theatre.jsx'
import Post from './single_post.jsx'

import FirebaseHandler from '../firebase'
import Utils from '../utils'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Feed extends React.Component {

  constructor(props) {

    super(props)

    // List of all posts on the page.
    this.posts = [];
    // Map of posts that can be displayed.
    this.newPosts = {};

    // Firebase SDK.
    this.auth = firebase.auth();

    this.state = {
      posts: [],
      noPostsStyle: {
        display: 'block'
      },
      nextPageBtnDisabled: true,
      nextPageBtnStyle: {
        display: 'none'
      },

      newPostsBtnStyle: {
        display: 'none'
      },
      nbNewPosts: 0,
      newPosts: {},
      newPostsArr: [],
      newBtnText: 'Show new posts...',
      clickHandlerAdded: false,
      loaded: false
    }

    this.addPosts = this.addPosts.bind(this);
    this.toggleNextPageButton = this.toggleNextPageButton.bind(this);
    this.showNewPosts = this.showNewPosts.bind(this);

    this.showGeneralFeed = this.showGeneralFeed.bind(this);

    this.onPostDeleted = this.onPostDeleted.bind(this);
    this.addNewPost = this.addNewPost.bind(this);
    this.getPostData = this.getPostData.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);

  }


  componentDidMount() {


    var self = this;

    self.showGeneralFeed();

    componentHandler.upgradeDom();

  }
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }
  componentWillUnmount() {
    // Clean up firebase callbacks 
    function clear() {
      return;
    }

    this.addNewPost = clear;
    this.getPostData = clear;
    this.onPostDeleted = clear;
    this.loadMorePosts = clear;
    this.addPosts = clear;

  }

  // Firebase callbacks
  getPostData(data) {

    // Listen for new posts.
    const latestPostId = Object.keys(data.entries)[Object.keys(data.entries).length - 1];
    FirebaseHandler.subscribeToGeneralFeed(
      (postId, postValue) => this.addNewPost(postId, postValue), latestPostId);

    // Adds fetched posts and next page button if necessary.
    this.addPosts(data.entries);

    this.toggleNextPageButton(data.nextPage);

  }

  /**
   * Appends the given list of `posts`.
   */
  addPosts(posts) {

    // Displays the list of posts

    var posts_arr = this.state.posts.slice();

    //var posts_arr = [];

    const postIds = Object.keys(posts);
    for (let i = postIds.length - 1; i >= 0; i--) {

      this.setState({
        noPostsStyle: {
          display: 'none'
        }
      });

      const postData = posts[postIds[i]];


      var post = (
        <Post postId={postIds[i]} key={postIds[i]} hideDeleteBtn={true}></Post>
      )

      posts_arr.push(post)

    }

    this.setState({
      posts: posts_arr
    })
  }

  /**
   * Shows the "load next page" button and binds it the `nextPage` callback. If `nextPage` is `null`
   * then the button is hidden.
   */
  toggleNextPageButton(nextPage) {

    var self = this;

    if (!self.state.clickHandlerAdded) {
      var btn = document.getElementById('load-more-btn');
      btn.onclick = (e) => { this.loadMorePosts(nextPage) };

      self.setState({
        clickHandlerAdded: true
      })
    }
    if (nextPage) {


      self.setState({
        nextPageBtnStyle: {
          display: 'block'
        },
        nextPageBtnDisabled: false
      })

      // Enable infinite Scroll
      Utils.onEndScroll(100).then(() => {
        self.loadMorePosts(nextPage)
      });



    } else {

      self.setState({
        nextPageBtnStyle: {
          display: 'none'
        },
      })

    }
  }

  loadMorePosts(nextPage) {

    var self = this;
    this.setState({
      nextPageBtnDisabled: true
    })
    console.log('Loading next page of posts.');
    nextPage().then(data => {
      self.addPosts(data.entries);
      self.toggleNextPageButton(data.nextPage);
    });


  };


  /**
   * Prepends the list of new posts stored in `this.newPosts`. This happens when the user clicks on
   * the "Show new posts" button.
   */
  showNewPosts(self) {


    self.setState({
      newPostsBtnStyle: {
        display: 'none'
      },
      noPostsStyle: {
        display: 'none'
      }
    })

    var newPosts = Object.assign({}, self.state.newPosts);


    var allPosts = self.state.posts.slice();
    var updatedPosts = [];

    const postKeys = Object.keys(newPosts);

    for (let i = 0; i < postKeys.length; i++) {

      var post = <Post postId={postKeys[i]} key={postKeys[i]} hideDeleteBtn={true}></Post>

      allPosts.unshift(post);
    }

    self.setState({
      posts: allPosts,
      newPosts: []
    })


  }

  /**
   * Displays the general posts feed.
   */
  showGeneralFeed() {

    var self = this;
    // Load initial batch of posts.
    FirebaseHandler.getPosts().then((data) => { this.getPostData(data) });

    // Listen for posts deletions.
    FirebaseHandler.registerForPostsDeletion(postId => this.onPostDeleted(postId));
  }



  /**
   * Triggered when a post has been deleted.
   */
  onPostDeleted(postId) {


    // Potentially remove post from in-memory new post list. 

    var allPosts = this.state.posts.slice();
    var newPosts = Object.assign({}, this.state.newPosts);

    var filtered_posts = allPosts.filter((post) => {
      if (post.key == postId) return false;
      else return true;
    })

    delete newPosts[postId];

    this.setState({
      posts: filtered_posts,
      newPosts: newPosts
    })

    if (Object.keys(newPosts).length == 0) {
      this.setState({
        newPostsBtnStyle: {
          display: 'none'
        }
      })
    } else {
      this.setState({
        newBtnText: `Display ${Object.keys(newPosts).length} new posts`
      })
    }

  }

  /**
   * Adds a new post to display in the queue.
   */
  addNewPost(postId, postValue) {
    // this.newPosts[postId] = postValue;

    var postObj = Object.assign({}, this.state.newPosts);
    postObj[postId] = postValue;


    this.setState({
      newPosts: postObj,
      newBtnText: `Display ${Object.keys(postObj).length} new posts`,
      newPostsBtnStyle: {
        display: 'flex'
      }
    })
  }

  render() {
    return (
      <div id="feed-container">
        <Theatre></Theatre>
        <section id="page-feed" className="mdl-grid fp-content">
          <div className="fp-new-posts-button" style={this.state.newPostsBtnStyle} >
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400" style={this.state.newPostsBtnStyle} onClick={() => { this.showNewPosts(this) } }>
              {this.state.newBtnText}
            </button>
          </div>
          <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
            {
              this.state.posts.map((post) => {
                return post
              })
            }

            <div className="fp-no-posts fp-help mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--8-col-desktop mdl-grid mdl-grid--no-spacing" style={this.state.noPostsStyle}>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <i className="fp-info material-icons">help</i>
                <div>
                  <p>Start following people to see their posts!</p>
                  <p>
                    Use the <strong><i className="material-icons">search</i> search bar</strong> to find people you know and have
                                    a look at the <Link to="/feed"><span><i className="material-icons">trending_up</i> feed</span></Link> to discover interesting people.
                                </p>
                  <p>Then <i className="material-icons">favorite</i> like and comment their posts!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fp-next-page-button" id="more-posts" style={this.state.nextPageBtnStyle} disabled={this.state.nextPageBtnDisabled}>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--fab" id="load-more-btn">
              <i className="material-icons">expand_more</i>
            </button>
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(Feed)