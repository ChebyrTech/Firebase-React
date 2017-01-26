import React from 'react' 
import {Link, withRouter} from 'react-router'

import FirebaseHandler from '../firebase'


import {connect} from 'react-redux'
import { bindActionCreators} from 'redux' 

import * as appActions from '../actions/appActions'

class UserProfile extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            userDetail: {}, 
            userInfoContainerStyle: {
                display: 'none'
            }, 
            userAvatarStyle: {
                backgroundImage: 'url()'
            }, 
            followingContainerStyle: {
                display: 'none'
            }, 
            noPostsStyle: {
                display: 'block'
            },
            nextPageButtonStyle: {
                display: 'none'  
            }, 
            followContainerStyle: {
                display: 'none'
            }, 
            nextPageBtnDisabled: false, 
            followingContainerClass: '', 
            nbLikes: 0, 
            nbComments: 0, 
            nbFollowing: 0, 
            nbFollowers: 0, 
            nbPosts: 0, 

            posts: [], 
            profiles: [], 

            nextPage: {}

        } 

        // Firebase SDK 
        this.database = firebase.database();
        this.auth = firebase.auth();

        this.loadUser = this.loadUser.bind(this); 
        this.createImageCard = this.createImageCard.bind(this); 
        this.addPosts = this.addPosts.bind(this); 
        this.toggleNextPageButton = this.toggleNextPageButton.bind(this); 
    } 


    componentDidMount() {
        this.loadUser(this.props.params.uid)
    }

  /**
   * Adds the list of posts to the UI.
   */
  addPosts(posts) {
    const postIds = Object.keys(posts); 
    var self = this; 

    var posts_array = []
    for (let i = postIds.length - 1; i >= 0; i--) { 

        

      posts_array.push(self.createImageCard(postIds[i],
      posts[postIds[i]].thumb_url || posts[postIds[i]].url, posts[postIds[i]].text))
    
    } 


        self.setState({
        noPostsStyle: {
            display: 'none', 
            posts: posts_array
        }, 
        posts: posts_array
    })
  }

  /**
   * Shows the "load next page" button and binds it the `nextPage` callback. If `nextPage` is `null`
   * then the button is hidden.
   */
  toggleNextPageButton(nextPage) { 

    console.log('btn function')
    if (nextPage) {

        this.setState({
            nextPage: nextPage, 
            nextPageButtonStyle: {
                display: 'block'
            }
        })

    } else {
      this.setState({
          nextPageButtonStyle: {
              display: 'none'
          }
      })
    }
  }

  /**
   * Next page button click handler 
   */
  showNextPage(e, self) {
      self.setState({
          nextPageBtnDisabled: true 
      }) 

      self.state.nextPage().then(data => {
          self.addPosts(data.entries);
          self.toggleNextPageButton(data.nextPage);
      })


  }

  /**
   * Displays the given user information in the UI.
   */
  loadUser(userId) {
    
    console.log(userId)
    console.log(this.props.uid)
    // If users is the currently signed-in user we hide the "Follow" checkbox and the opposite for
    // the "Notifications" checkbox.
    if (userId == this.props.uid) {
     // this.followContainer.hide();
        this.setStyle({
            followContainerStyle: {
                display: 'none'
            }
        })

     // Messaging options!!! Do later
     // friendlyPix.messaging.enableNotificationsContainer.show();
     // friendlyPix.messaging.enableNotificationsCheckbox.prop('disabled', true);
     // friendlyPix.MaterialUtils.refreshSwitchState(friendlyPix.messaging.enableNotificationsContainer);
     // friendlyPix.messaging.trackNotificationsEnabledStatus();
    } else {

    //friendlyPix.messaging.enableNotificationsContainer.hide(); 

    //  this.followContainer.show();
    //  this.followCheckbox.prop('disabled', true); 

     // see utils switch 
     // friendlyPix.MaterialUtils.refreshSwitchState(this.followContainer);
      // Start live tracking the state of the "Follow" Checkbox.
      
      // follow status
      //this.trackFollowStatus();
    }

    var self = this; 

    // Load user's profile.
    FirebaseHandler.loadUserProfile(userId).then(snapshot => {
      const userInfo = snapshot.val();
      self.setState({
          userDetail: userInfo
      })
      
      if (userInfo) {

          self.setState({
              userInfoContainerStyle: {
                  display: 'flex'
              }, 
              userAvatarStyle: {
                  backgroundImage: `url("${userInfo.profile_picture || '/images/silhouette.jpg'}")`
              }, 
              userName: userInfo.full_name || 'Anonymous' 
            
          })

      } else {
        var data = {
          message: 'This user does not exists.',
          timeout: 5000
        };

        self.props.userLoadError(data); 
        self.props.router.push('/feed'); 

      }
    });

    // Lod user's number of followers.
    FirebaseHandler.registerForFollowersCount(userId,
        nbFollowers => {
            self.setState({
                nbFollowers: nbFollowers
            })
    })

    // Lod user's number of followed users.
    FirebaseHandler.registerForFollowingCount(userId,
    nbFollowed => {

        self.setState({
           nbFollowed: nbFollowed 
        })
    })

    // Lod user's number of posts.
    FirebaseHandler.registerForPostsCount(userId,
    nbPosts => {
        self.setState({
            nbPosts: nbPosts
        })
    })

    // Display user's posts.
    FirebaseHandler.getUserFeedPosts(userId).then(data => {
      const postIds = Object.keys(data.entries);
      if (postIds.length === 0) {
        self.setState({
            noPostsStyle: {
                display: 'block'
            }
        }) 
        
      }
      FirebaseHandler.subscribeToUserFeed(userId,
        (postId, postValue) => { 

          var posts_array = self.state.posts.slice();  
          posts_array.unshift(self.createImageCard(postId,
          postValue.thumb_url || postValue.url, postValue.text)) 
         
 
         self.setState({
             noPostsStyle: {
                 display :'none'
             }, 
             posts: posts_array
         }) 

         
        }, postIds[postIds.length - 1]);

      // Adds fetched posts and next page button if necessary.
    self.addPosts(data.entries);
    self.toggleNextPageButton(data.nextPage);
    });

    // Listen for posts deletions.
    FirebaseHandler.registerForPostsDeletion(postId => {
  
       var posts = self.state.posts.slice(); 
       var filtered = posts.filter((el) => {
           if (el.id == postId) {
               return false; 

           } else {
               return true; 
           }
       })

       self.setState({
           posts: filtered 
       }) 

       console.log(posts)

         //$(`.fp-post-${postId}`, this.userPage).remove();
    })
     
      
  }

  /**
   * Displays the list of followed people.
   */
  displayFollowing() { 

    var self = this; 
    FirebaseHandler.getFollowingProfiles(this.userId).then(profiles => {


      self.setState({
          nbFollowing: 0
      })

      var profiles_arr = []; 

      Object.keys(profiles).forEach(uid => 
         profiles_arr.push(self.createProfileCardJsx(
      uid, profiles[uid].profile_picture, profiles[uid].full_name))); 

      if (Object.keys(profiles).length > 0) {

          self.setState({
              followingContainerStyle: {
                  display: 'block'
              },  
              followingContainerClass: 'is-active', 
              profiles: profiles_arr

          }) 

      }
    });
  } 

  /**
   * Handles post links in the context of react-router 
   */
    hrefHandler(self, postId) {

        self.props.router.push(`/post/${postId}`); 
    }

  /**
   * Returns an image Card element for the image with the given URL.
   */
  createImageCard(postId, thumbUrl, text) {

    var self = this; 
    var thumbStyle = {
        backgroundImage: `url("${thumbUrl.replace(/"/g, '\\"')}")`
    } 


    const element = (
    <a onClick={(e)=>{this.hrefHandler(self, postId)}} key={Math.random() * 100000} className={"fp-post-" + postId + " fp-image mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing"}>
             <div className="fp-overlay">
                  <i className="material-icons">favorite</i><span className="likes">{self.state.nbLikes}</span>
                  <i className="material-icons">mode_comment</i><span className="comments">{self.state.nbComments}</span>
                  <div className="fp-pic-text">{text}</div>
              </div>
              <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop" style={thumbStyle}></div>
            </a>)

    // Start listening for comments and likes counts.
    FirebaseHandler.registerForLikesCount(postId, (nbLikes) => {    
            self.setState({
                nbLikes: nbLikes
            })
    })
    FirebaseHandler.registerForCommentsCount(postId, (nbComments) => {
            self.setState({
                nbComments: nbComments
            })
    })

    return element;
  }

  /**
   * Returns an image Card element for the image with the given URL.
   */
  createProfileCardJsx(uid, profilePic = '/images/silhouette.jpg', fullName = 'Anonymous') {

    avatarStyle = {
        backgroundImage: `url('${profilePic}'`
    }
    return (
       <Link to={"/user/" + uid}> <span className="fp-usernamelink mdl-button mdl-js-button">
            <div className="fp-avatar"></div>
            <div className="fp-username mdl-color-text--black">{fullName}</div>
      </span></Link>)
  }


    render () {
        return (
            <section id="page-user-info" className="mdl-grid fp-content">
            <div className="fp-user-container mdl-shadow--2dp mdl-cell mdl-cell--12-col" style={this.state.userInfoContainerStyle}>
                <div className="fp-user-avatar" style={this.state.userAvatarStyle}></div>
                <div className="fp-name-follow-container mdl-cell mdl-cell--5-col">
                <div className="fp-user-username">{this.state.userName}</div>
                <div className="fp-signed-in-only">
                    <label className="fp-follow mdl-switch mdl-js-switch mdl-js-ripple-effect" style={this.state.followContainerStyle} htmlFor="follow">
                    <input type="checkbox" id="follow" className="mdl-switch__input" value="true" />
                    <span className="mdl-switch__label">Follow</span>
                    </label>
                    <label className="fp-notifications mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="notifications">
                    <input type="checkbox" id="notifications" className="mdl-switch__input" value="true" />
                    <span className="mdl-switch__label">Enable Notifications</span>
                    </label>
                </div>
                <div className="fp-user-detail-container">
                    <div className="fp-user-detail"><span className="fp-user-nbposts">{this.state.nbPosts}</span> posts</div>
                    <div className="fp-user-detail"><span className="fp-user-nbfollowers">{this.state.nbFollowers}</span> followers</div>
                    <div className={"fp-user-detail fp-user-nbfollowing-container " + this.state.followingContainerClass} style={this.state.followingContainerStyle}>
                        {this.state.profiles.map((profile) => {
                            return profile; 
                        })}
                        <span className="fp-user-nbfollowing">{this.state.nbFollowing}</span> following</div>
                </div>
                </div>
            </div>
            <div className="fp-user-following mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">
                <button className="fp-close-following  mdl-button mdl-js-button mdl-button--raised mdl-button--fab">
                <i className="material-icons">expand_less</i>
                </button>
            </div>
            <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
                {this.state.posts.map((post) => {
                    return post; 
                })}
                <div className="fp-no-posts mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop mdl-grid mdl-grid--no-spacing" style={this.state.noPostsStyle}>
                <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                    No posts yet.
                </div>
                </div>
            </div>
            <div className="fp-next-page-button" style={this.state.nextPageButtonStyle} onClick={(e) => {this.showNextPage(e, self)}}>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--fab" style={this.state.nextPageButtonStyle} disabled={this.state.nextPageBtnDisabled}>
                <i className="material-icons">expand_more</i>
                </button>
            </div>
            </section>
        )
    }
} 


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            userLoadError: appActions.userLoadError
        }, 
        dispatch
    )
}

export default withRouter(connect(null, matchDispatchToProps)(UserProfile))