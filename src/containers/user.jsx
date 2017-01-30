import React from 'react' 
import {Link, withRouter} from 'react-router'

import FirebaseHandler from '../firebase'
import Utils from '../utils'

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
            noPostsStyle: {
                display: 'block'
            },
            nextPageButtonStyle: {
                display: 'none'  
            }, 
            followContainerStyle: {
                display: 'block'
            }, 
            notificationContainerStyle: {
                display: 'block'
            }, 
            closeFollowingBtnStyle: {
                display: 'none'
            }, 
            followingContainerStyle: {
                display: 'none'
            },
            nextPageBtnDisabled: false, 
            followChecked: true, 
            followingContainerClass: '', 
            nbFollowing: 0, 
            nbFollowers: 0, 
            nbPosts: 0,  

            followCheckboxChecked: true,  
            followCheckboxDisabled: false, 
            followLabelText: 'Following', 
            followVal: false,

            posts: [], 
            likes: [], 
            comments: [], 
            profiles: [], 

            nextPage: {}

        } 

        // Firebase SDK 
        this.database = firebase.database();
        this.auth = firebase.auth();

        this.loadUser = this.loadUser.bind(this); 
        this.createImageCard = this.createImageCard.bind(this); 
        this.createProfileCardJsx = this.createProfileCardJsx.bind(this);
        this.addPosts = this.addPosts.bind(this); 
        this.toggleNextPageButton = this.toggleNextPageButton.bind(this);  

        this.trackFollowStatus = this.trackFollowStatus.bind(this); 
        this.onFollowChange = this.onFollowChange.bind(this); 

        var self = this; 
 
      // this.auth.onAuthStateChanged(() => this.trackFollowStatus); 
    } 


    componentDidMount() {
       console.log('mounted')
       var self = this; 

       
       this.auth.onAuthStateChanged((user)=> {
            
            this.trackFollowStatus(); 
            this.loadUser(self.props.params.uid)  

            if (!user) {
                self.setState({
                    followContainerStyle: {
                        display: 'none'
                    }
                })
            }  

        }) 

    } 

    componentWillUnmount() {

       // FirebaseHandler.cancelAllSubscriptions(); 
    }

    
  /**
   * Triggered when the user changes the "Follow" checkbox.
   */
  onFollowChange(e, self) {

     FirebaseHandler.toggleFollowUser(self.props.params.uid, e.target.checked); 

  }

  /**
   * Starts tracking the "Follow" checkbox status.
   */
  trackFollowStatus() {
    if (this.auth.currentUser) { 

    var self = this; 

 
    FirebaseHandler.registerToFollowStatusUpdate(this.props.params.uid, data => {  

       var checkbox = document.getElementById('follow'); 
       if (data.val() !== null) { 

           checkbox.checked = true; 

  
            self.setState({
                followChecked: 'is-checked', 
                followLabelText : 'Following'
            })
           

     } else {
  
           self.setState({
               followChecked: '', 
               followLabelText : 'Follow'
           }) 
         
             checkbox.checked = false; 
            }
          }); 

     }
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

    var more_posts = self.state.posts.slice(); 
    more_posts = more_posts.concat(posts_array); 

        self.setState({
        noPostsStyle: {
            display: 'none'
        }, 
        posts: more_posts
    })
  }

  /**
   * Shows the "load next page" button and binds it the `nextPage` callback. If `nextPage` is `null`
   * then the button is hidden.
   */
  toggleNextPageButton(nextPage) { 

    if (nextPage) {

        this.setState({
            nextPage: nextPage, 
            nextPageButtonStyle: {
                display: 'block'
            }, 
            nextPageBtnDisabled: false 
        })

    } else {
      this.setState({
          nextPageButtonStyle: {
              display: 'none'
          }, 
          nextPageBtnDisabled: false 
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

    // If users is the currently signed-in user we hide the "Follow" checkbox and the opposite for
    // the "Notifications" checkbox.
    if (this.auth.currentUser && userId == this.auth.currentUser.uid) {

        this.setState({
            followContainerStyle: {
                display: 'none'
            }, 
            notificationContainerStyle: {
                display: 'block'
            } 

        })

     // Messaging options!!! Do later
     // friendlyPix.messaging.enableNotificationsContainer.show();
     // friendlyPix.messaging.enableNotificationsCheckbox.prop('disabled', true);
   // Utils.refreshSwitchState(document.querySelector('.fp-name-follow-container'))
     // friendlyPix.messaging.trackNotificationsEnabledStatus();
    } else {

        this.setState({
            followContainerStyle: {
                    display: 'block'
            }, 
            notificationContainerStyle: {
                    display: 'none'
            }
        })
    //friendlyPix.messaging.enableNotificationsContainer.hide(); 

    //  this.followContainer.show();
    //  this.followCheckbox.prop('disabled', true); 

     // see utils switch 
    
      // Start live tracking the state of the "Follow" Checkbox.
      
      // follow status
      this.trackFollowStatus();
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
          message: 'This user does not exist.',
          timeout: 5000
        };

        self.props.userLoadError(data); 
        self.props.router.push('/feed'); 

      }
    });

    // Load user's number of followers.
    FirebaseHandler.registerForFollowersCount(this.props.params.uid,
        nbFollowers => {
     
            self.setState({
                nbFollowers: nbFollowers
            })

    })

    // Load user's number of followed users.
    FirebaseHandler.registerForFollowingCount(this.props.params.uid,
        nbFollowed => {

            self.setState({
            nbFollowing: nbFollowed 
            })
    })


    // Load user's number of posts.
    FirebaseHandler.registerForPostsCount(this.props.params.uid,
    nbPosts => { 
 

            self.setState({
                nbPosts: nbPosts
            })
        
    })

    // Display user's posts.
    FirebaseHandler.getUserFeedPosts(this.props.params.uid).then(data => {

 
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

           if (el.key == postId) {
               return false; 

           } else {
               return true; 
           }
       })

       self.setState({
           posts: filtered 
       }) 
    })
     
      
  }

  /**
   * Displays the list of followed people.
   */
  displayFollowing(self) { 
 
    FirebaseHandler.getFollowingProfiles(this.props.params.uid).then(profiles => {

      var profiles_arr = []; 

      Object.keys(profiles).forEach(uid => 
         profiles_arr.push(self.createProfileCardJsx(
      uid, profiles[uid].profile_picture, profiles[uid].full_name))); 

      if (Object.keys(profiles).length > 0) {

          self.setState({

              followingContainerClass: 'is-active', 
              profiles: profiles_arr, 
              followingContainerStyle: {
                  display: 'block'
              }, 
              closeFollowingBtnStyle: {
                  display: 'block'
              }

          }) 

      } 

    });
  } 

/**
 * Hides the list of followed people
 */
  closeFollowing(self) { 
 
      self.setState({
          followingContainerClass: '', 
          followingContainerStyle: {
              display: 'none'
          }
      })
  }

  /**
   * Handles links in dynamically created jsx components 
   */
    hrefHandler(self, id, prefix) {

        self.props.router.push(`/${prefix}/${id}`); 

        if (prefix == 'user') {
            window.location.reload(); 
        }

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
    <a onClick={(e)=>{this.hrefHandler(self, postId, 'post')}} key={postId} className={"fp-post-" + postId + " fp-image mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing"}>
             
            

             <div className="fp-overlay">
                  <i className="material-icons">favorite</i><span className={"likes " + "likes" + postId}></span>
                  <i className="material-icons">mode_comment</i><span className={"comments " + "comments" + postId}></span>
                  <div className="fp-pic-text">{text}</div>
              </div>
              <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop" style={thumbStyle}></div>
            </a>)


    return element;
  }


  /**
   * Returns an image Card element for the image with the given URL.
   */
  createProfileCardJsx(uid, profilePic = '/images/silhouette.jpg', fullName = 'Anonymous') {
  
    var avatarStyle = {
        backgroundImage: `url('${profilePic}'`
    }


    return (
    <a onClick={()=>{this.hrefHandler(this,uid,'user')}} key={uid} className="fp-usernamelink mdl-button mdl-js-button">
            <div className="fp-avatar" style={avatarStyle}></div>
            <div className="fp-username mdl-color-text--black">{fullName}</div>
      </a>)
  }


    render () {
        return (
            <section id="page-user-info" className="mdl-grid fp-content">
            <div className="fp-user-container mdl-shadow--2dp mdl-cell mdl-cell--12-col" style={this.state.userInfoContainerStyle}>
                <div className="fp-user-avatar" style={this.state.userAvatarStyle}></div>
                <div className="fp-name-follow-container mdl-cell mdl-cell--5-col">
                <div className="fp-user-username">{this.state.userName}</div>
                <div className="fp-signed-in-only">
                    <label className={"fp-follow mdl-switch mdl-js-switch mdl-js-ripple-effect " + this.state.followChecked} style={this.state.followContainerStyle} htmlFor="follow" onChange={(e)=>{this.onFollowChange(e, this)}}>
                    <input type="checkbox" id="follow" className="mdl-switch__input" />
                    <span className="mdl-switch__label">{this.state.followLabelText}</span>
                    </label>
                    <label className="fp-notifications mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="notifications" style={this.state.notificationContainerStyle}>
                    <input type="checkbox" id="notifications" className="mdl-switch__input" value="true" />
                    <span className="mdl-switch__label">Enable Notifications</span>
                    </label>
                </div>
                <div className="fp-user-detail-container">
                    <div className="fp-user-detail"><span className="fp-user-nbposts">{this.state.nbPosts}</span> posts</div>
                    <div className="fp-user-detail"><span className="fp-user-nbfollowers">{this.state.nbFollowers}</span> followers</div>
                    <div className={"fp-user-detail fp-user-nbfollowing-container " + this.state.followingContainerClass} onClick={()=>{this.displayFollowing(this)}}>
            
                        <span className="fp-user-nbfollowing">{this.state.nbFollowing}</span> following</div>
                </div>
                </div>
            </div>
            <div className="fp-user-following mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" style={this.state.followingContainerStyle}>
            {this.state.profiles.map((profile) => {
                return profile; 
            })}
            <button className="fp-close-following  mdl-button mdl-js-button mdl-button--raised mdl-button--fab" style={this.state.closeFollowingBtnStyle} onClick={()=>{this.closeFollowing(this)}}>
            
                <i className="material-icons">expand_less</i>
                </button>
            </div>
            <div className="fp-image-container mdl-cell mdl-cell--12-col mdl-grid">
                {this.state.posts.map((post) => { 

                    var postId = post.key;  
                
               

                    var likes, comments = null;      
                    setTimeout(get_post_status, 20)

                        function get_post_status() {
                        
                                //Start listening for comments and likes counts.
                                FirebaseHandler.registerForLikesCount(postId, (nbLikes) => {    
                            

                                    if (document.querySelectorAll('.likes' + postId).length > 0) { 
                                        likes = nbLikes
                                        document.querySelector('.likes' + postId).innerHTML = nbLikes; 
                                    }
                                    
                                })
                                FirebaseHandler.registerForCommentsCount(postId, (nbComments) => {
                                

                                    if (document.querySelectorAll('.comments' + postId).length > 0) {
                                        comments = comments; 
                                        document.querySelector('.comments' + postId).innerHTML = nbComments; 
                                    }
                                }) 

                                if (!comments || !likes) {
                                    setTimeout(get_post_status, 20)
                                }
                         
                        }


                    return post;  

                    
                })}
                <div className="fp-no-posts mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop mdl-grid mdl-grid--no-spacing" style={this.state.noPostsStyle}>
                <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                    No posts yet.
                </div>
                </div>
            </div>
            <div className="fp-next-page-button" style={this.state.nextPageButtonStyle} onClick={(e) => {this.showNextPage(e, this)}}>
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