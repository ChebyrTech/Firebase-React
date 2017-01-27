import React from 'react' 
import {Link} from 'react-router' 

import Theatre from './theatre.jsx' 
import Post from './single_post.jsx'

import FirebaseHandler from '../firebase'
import Utils from '../utils'

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux' 


export default class Feed extends React.Component { 

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
            nbNewPosts: 0 
        } 

        this.addPosts = this.addPosts.bind(this); 
        this.toggleNextPageButton = this.toggleNextPageButton.bind(this); 
        this.showNewPosts = this.showNewPosts.bind(this);  

        this.showGeneralFeed = this.showGeneralFeed.bind(this); 
        this.showHomeFeed =  this.showHomeFeed.bind(this); 

        this.onPostDeleted = this.onPostDeleted.bind(this); 
        this.addNewPost = this.addNewPost.bind(this); 
    } 


    componentDidMount() {

      var self = this; 
      this.auth.onAuthStateChanged((user) => {
          self.showGeneralFeed();
      })
    } 


    // ----------------------------------------------

  /**
   * Appends the given list of `posts`.
   */
  addPosts(posts) {
    // Displays the list of posts

    var posts_arr = []; 
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


      // const postElement = post.fillPostData(postIds[i], postData.thumb_url || postData.url,
      //     postData.text, postData.author, postData.timestamp, null, null, postData.full_url); 

      // If a post with similar ID is already in the feed we replace it instead of appending.
      // const existingPostElement = $(`.fp-post-${postIds[i]}`, this.feedImageContainer);
      // if (existingPostElement.length) {
      //   existingPostElement.replaceWith(postElement);
      // } else {
      //   this.feedImageContainer.append(postElement.addClass(`fp-post-${postIds[i]}`));
      // }


    } 

    console.log(posts_arr)
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
    if (nextPage) {
      const loadMorePosts = () => {

        self.nextPageButton.prop('disabled', true);
        console.log('Loading next page of posts.');
        nextPage().then(data => {
          self.addPosts(data.entries);
          self.toggleNextPageButton(data.nextPage);
        });
      };
      self.setState({
        nextPageBtnStyle: {
          display: 'block'
        }, 
        nextPageBtnDisabled: false
      }) 

      // Enable infinite Scroll.
      Utils.onEndScroll(100).then(loadMorePosts);

      document.getElementById('more-posts').onclick = loadMorePosts; 

    } else {

        self.setState({
            nextPageBtnStyle: {
              display: 'none'
            }, 
        })

    }
  }

  
  /**
   * Prepends the list of new posts stored in `this.newPosts`. This happens when the user clicks on
   * the "Show new posts" button.
   */
  showNewPosts() {
    const newPosts = this.newPosts;
    this.newPosts = {};
    this.newPostsButton.hide();
    const postKeys = Object.keys(newPosts);

    for (let i = 0; i < postKeys.length; i++) {
      this.noPostsMessage.hide();
      const post = newPosts[postKeys[i]];
      const postElement = new friendlyPix.Post();
      this.posts.push(postElement);
      this.feedImageContainer.prepend(postElement.fillPostData(postKeys[i], post.thumb_url ||
          post.url, post.text, post.author, post.timestamp, null, null, post.full_url));
    }
  }

  /**
   * Displays the general posts feed.
   */
  showGeneralFeed() {
    var self = this; 
    // Load initial batch of posts.
    FirebaseHandler.getPosts().then(data => {
      // Listen for new posts.
      const latestPostId = Object.keys(data.entries)[Object.keys(data.entries).length - 1];
      FirebaseHandler.subscribeToGeneralFeed(
          (postId, postValue) => this.addNewPost(postId, postValue), latestPostId);

      // Adds fetched posts and next page button if necessary.
      self.addPosts(data.entries);
      self.toggleNextPageButton(data.nextPage);
    });

    // Listen for posts deletions.
    FirebaseHandler.registerForPostsDeletion(postId => this.onPostDeleted(postId));
  }

  /**
   * Shows the feed showing all followed users.
   */
  showHomeFeed() {
    var self = this; 

    if (this.auth.currentUser) {
      // Make sure the home feed is updated with followed users's new posts.
      FirebaseHandler.updateHomeFeeds().then(() => {
        // Load initial batch of posts.
        FirebaseHandler.getHomeFeedPosts().then(data => {
          const postIds = Object.keys(data.entries);
          if (postIds.length === 0) {
              self.setState({
                  noPostsStyle: {
                    display: 'block'
                  }
              })
          }
          // Listen for new posts.
          const latestPostId = postIds[postIds.length - 1];
          FirebaseHandler.subscribeToHomeFeed(
              (postId, postValue) => {
                this.addNewPost(postId, postValue);
              }, latestPostId);

          // Adds fetched posts and next page button if necessary.
          this.addPosts(data.entries);
          this.toggleNextPageButton(data.nextPage);
        });

        // Add new posts from followers live.
        FirebaseHandler.startHomeFeedLiveUpdaters();

        // Listen for posts deletions.
        FirebaseHandler.registerForPostsDeletion(postId => this.onPostDeleted(postId));
      });
    }
  }

  /**
   * Triggered when a post has been deleted.
   */
  onPostDeleted(postId) {
    // Potentially remove post from in-memory new post list.
    if (this.newPosts[postId]) { 
      
      delete this.newPosts[postId];
      const nbNewPosts = Object.keys(this.newPosts).length;
      this.newPostsButton.text(`Display ${nbNewPosts} new posts`);
      if (nbNewPosts === 0) {
        this.newPostsButton.hide();
      }
    }


  }

  /**
   * Adds a new post to display in the queue.
   */
  addNewPost(postId, postValue) {
    this.newPosts[postId] = postValue;
    this.newPostsButton.text(`Display ${Object.keys(this.newPosts).length} new posts`);
    this.newPostsButton.show();
  }



    // ---------------------------------------------

    render () {
        return (
            <div> 
            <Theatre></Theatre>
            <section id="page-feed" className="mdl-grid fp-content">
                <div className="fp-new-posts-button">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400">
                        Show new posts...
                    </button>
                </div>
                <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid"> 
                  {
                    this.state.posts.map((post)=> {
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
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--fab">
                        <i className="material-icons">expand_more</i>
                    </button>
                </div>
            </section>
            </div>
        )
    }
}
