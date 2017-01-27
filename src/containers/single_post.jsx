import React from 'react' 
import {Link, withRouter} from 'react-router' 

import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'

import * as appActions from '../actions/appActions' 

import Theatre from './theatre.jsx'

import FirebaseHandler from '../firebase'

class SinglePost extends React.Component { 

    constructor(props) {
        super(props) 

    // List of all times running on the page.
    this.timers = [];

    // Firebase SDK.
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth(); 

    // class methods 
    this.loadPost = this.loadPost.bind(this); 
    this.clear = this.clear.bind(this); 
    this.displayComments = this.displayComments.bind(this); 
    this.displayNextPageButton = this.displayNextPageButton.bind(this);  
    this.fillPostData = this.fillPostData.bind(this); 
    
    this._setupThumb = this._setupThumb.bind(this);  
    this._setupDate = this._setupDate.bind(this); 
    this._setupComments = this._setupComments.bind(this); 
    this._setupDeleteButton = this._setupDeleteButton.bind(this); 
    this._setupLikeCountAndStatus = this._setupLikeCountAndStatus.bind(this);  
    this._changeLikeStatus = this._changeLikeStatus.bind(this); 

    this.state = {
        post: {
            author: {
                full_name: '',
                profile_picture: '',
                uid: ''
            },
            full_storage_uri: '',
            full_url: '',
            text: '',
            thumb_storage_uri: '',
            thumb_url: '',
            timestamp: 0
        }, 
        postId: '',

        
        avatarStyle: {
            backgroundImage: 'url()'
        }, 
        thumbStyle: {
            backgroundImage: 'url()'
        }, 
        fullStyle: {
            backgroundImage: 'url()'
        },  

        deleteBtnStyle: {
            display: 'block'
        }, 
        deleteBtnDisabled: false, 

        likedStyle: {
            display: 'none'
        }, 
        notLikedStyle: {
            display: 'block'
        }, 
        likePanelStyle: {
            display: 'none'
        }, 
        likesCount: 0,  

        firstComment: '', 
        comments: [], 
        commentId: '', 
        newCommentText: '', 

        commentsFormStyle: {
            display: 'none'
        }, 
 
        nextPageBtnDisabled: true, 
        nextPageBtnStyle: {
            display: 'none'
        }, 
        nextPage: '', 

        textTime: 'now'
        
        }
    
    }
    


componentDidMount(){

    var postId = this.props.params.postid || this.props.postId; 
    this.loadPost(postId); 
} 


  /**
   * Loads the given post's details.
   */
  loadPost(postId) {

    var self = this; 
    // Load the posts information.
    FirebaseHandler.getPostData(postId).then(snapshot => {
      const post = snapshot.val();


      if (!post) {
        var data = {
          message: 'This post does not exists.',
          timeout: 5000
        };

        self.props.deleteError(data)
            // this.toast[0].MaterialSnackbar.showSnackbar(data);
            if (this.auth.currentUser) {
            self.props.router.push('/user/' + this.auth.currentUser.uid)
            } else {
            self.props.router.push('/feed')
            }
      } else {

        this.setState({post: post}); 
        this.fillPostData(snapshot.key, post.thumb_url || post.url, post.text, post.author,
            post.timestamp, post.thumb_storage_uri, post.full_storage_uri, post.full_url);
      }
    });
  }

  /**
   * Clears all listeners and timers in the given element.
   */
  clear() {
    // Stops all timers if any.
    this.timers.forEach(timer => clearInterval(timer));
    this.timers = [];

    // Remove Firebase listeners.
    FirebaseHandler.cancelAllSubscriptions();
  }

  /**
   * Displays the given list of `comments` in the post.
   */
  displayComments(comments) {

      console.log(comments)
      var self = this; 

    var comments_state = self.state.comments.slice(); 
    if (comments.length == 0) return; 

    const commentsIds = Object.keys(comments);
    for (let i = commentsIds.length - 1; i >= 0; i--) {

            var comment = self.createCommentJsx(comments[commentsIds[i]].author, comments[commentsIds[i]].text); 
                
            comments_state.push(comment); 
    } 

        
    this.setState({
        comments: comments_state
    }) 
  }

  /**
   * Shows the "show more comments" button. If `nextPage` is
   * `null` then the button is hidden.
   */
  displayNextPageButton(nextPage) {

    if (nextPage) {

        this.setState({
            nextPageBtnStyle: {
                display: 'block'
            }
        })

        this.setState({
            nextPageBtnDisabled: false 
        })

        this.setState({
            nextPage: nextPage
        })


    } else {
        this.setState({
            nextPageBtnStyle: {
                display: 'none'
            }
        })
    }
  }

    /**
   * Clickhandler to show more comments 
   */
  showMoreComments(self) {
      if (self.state.nextPage != '') {

        self.state.nextPage().then(data => {
            self.setState({
                nextPageBtnDisabled: true 
            }) 
            self.displayComments(data.entries);
            self.displayNextPageButton(data.nextPage);
        })

      } 
  }

  /**
   * Fills the post's Card with the given details.
   * Also sets all auto updates and listeners on the UI elements of the post.
   */
  fillPostData(postId, thumbUrl, imageText, author, timestamp, thumbStorageUri, picStorageUri, picUrl) {
    const post = document.getElementById('post'); 

    this.setState({
        postId: postId
    })
    this.setState({
        avatarStyle: {
            backgroundImage: `url(${this.state.post.author.profile_picture || '/images/silhouette.jpg'})`
        }
    })

    // Shows the pic's thumbnail.
    this._setupThumb(thumbUrl, picUrl);

    // Make sure we update if the thumb or pic URL changes.
    FirebaseHandler.registerForThumbChanges(postId, thumbUrl => {
      this._setupThumb(thumbUrl, picUrl);
    });

    this._setupDate(postId, timestamp);
    this._setupDeleteButton(postId, author, picStorageUri, thumbStorageUri);
    this._setupLikeCountAndStatus(postId);
    this._setupComments(postId, author, imageText);
    return post;
  }


  /**
   * Shows the thumbnail and sets up the click to see the full size image.
   * @private
   */
  _setupThumb(thumbUrl, picUrl) {
    const post = document.getElementById('post'); 

    var thumb_url = this.state.thumb_url; 

    this.setState({
        thumbStyle: {
            backgroundImage: `url(${thumbUrl ? thumbUrl.replace(/"/g, '\\"') : ''})`
        }
    }); 
  }

  /**
   * Shows the publishing date of the post and updates this date live.
   * @private
   */
  _setupDate(postId, timestamp) {
    const post = document.getElementById('post'); 

    var time = this.getTimeText(timestamp); 
    this.setState({
        textTime: time
    })

    // Update the time counter every minutes.
    this.timers.push(setInterval(
      () => {
        var newTime = this.getTimeText(timestamp); 
            this.setState({
            textTime: newTime
        })
      }, 60000));
  }

  /**
   * Shows comments and binds actions to the comments form.
   * @private
   */
  _setupComments(postId, author, imageText) {
    const post = document.getElementById('post');  
    var self = this; 

    // first post html
    this.setState({
        firstComment: (
                <div className="fp-comment">
                    <Link to={"user/" + author.uid}><span className="fp-author">{author.full_name || 'Anonymous'}</span></Link>:
                    <span className="fp-text"> {imageText}</span>
                </div>
            )
    }); 


    // Load first page of comments and listen to new comments.
    FirebaseHandler.getComments(postId).then(data => { 


    self.displayComments(data.entries); 

    self.displayNextPageButton(data.nextPage);


      // Display any new comments.
      const commentIds = Object.keys(data.entries);
      FirebaseHandler.subscribeToComments(postId, (commentId, commentData) => { 

          var comment_array = this.state.comments;  

          var new_comment =  self.createCommentJsx(commentData.author, commentData.text)

          comment_array.push(new_comment)

      }, commentIds ? commentIds[commentIds.length - 1] : 0);
    });

    if (this.auth.currentUser) {

      const ran = Math.floor(Math.random() * 10000000); 

      self.setState({
          commentId:  `${postId}-${ran}-comment`
      })
      
      // Show comments form
      self.setState({
          commentsFormStyle: {
              display: 'flex'
          }
      })

    } 
  }

  /**
   * Generate enter theatre mode event 
   */
  enterTheatreMode(self) { 
      
      self.props.enterTheatreMode(self.state.post.full_url); 
  }

 /**
  * Captures the value of comment form input 
  */
  commentTextChangeHandler(e, self) {
      self.setState({
          newCommentText: e.target.value
      })
  } 

  /**
   * Submit comment handler 
   */
  submitCommentHandler(e, self) {

        e.preventDefault(); 

        // const commentText = document.querySelector(`.mdl-textfield__input`).value; 
        if (self.state.newCommentText.length === 0 || self.state.postId == '') {
            return;
        } 

        FirebaseHandler.addComment(self.state.postId, self.state.newCommentText);
        self.setState({
            newCommentText: ''
        })
  }

  /**
   * Shows/Hides the Delete button.
   * @private
   */
  _setupDeleteButton(postId, author, picStorageUri, thumbStorageUri) {
    const post = document.getElementById('post'); 

    if (this.auth.currentUser && this.auth.currentUser.uid === author.uid && picStorageUri && this.props.params.postId) { 
        this.setState({
          deleteBtnStyle: {
              display: 'block'
          }
      })
    } else {
      this.setState({
          deleteBtnStyle: {
              display: 'none'
          }
      })
    }
  }

  /** 
   *  Click handler for the Delete button 
   */
  deletePostHandler(self) { 

        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this post!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          allowEscapeKey: true
        }, () => { 
            
            self.setState({
                deleteBtnDisabled: true
            }); 

            var pid = self.props.params.postid || this.props.postId; 
             FirebaseHandler.deletePost(pid, this.state.post.full_storage_uri, this.state.post.thumb_storage_uri).then(() => {
                swal({
                title: 'Deleted!',
                text: 'Your post has been deleted.',
                type: 'success',
                timer: 2000
                });

                self.setState({
                    deleteBtnDisabled: false 
                });  

                self.props.router.push(`/user/${this.state.post.author.uid}`); 

             }).catch(error => {
                swal.close(); 
                self.setState({
                    deleteBtnDisabled: false 
                });   

                const data = {
                    message: `There was an error deleting your post: ${error}`,
                    timeout: 5000
                }; 

                self.props.deleteError(data); 
             })
        }); 

  }

  /**
   * Starts Likes count listener and on/off like status.
   * @private
   */
  _setupLikeCountAndStatus(postId) {
    const post = document.getElementById('post'); 

    var self = this; 
    if (this.auth.currentUser) { 
      // Listen to like status.
      FirebaseHandler.registerToUserLike(postId, isliked => { 
        if (isliked) { 

            self.setState({
                likedStyle: {
                    display: 'block'
                }
            })
            self.setState({
                notLikedStyle: {
                    display: 'none'
                }
            })

        } else {

            self.setState({
                likedStyle: {
                    display: 'none'
                }
            })
            self.setState({
                notLikedStyle: {
                    display: 'block'
                }
            })

        }
      }); 


        FirebaseHandler.registerForLikesCount(postId, nbLikes => {
            if (nbLikes > 0) {
                self.setState({
                    likesCount: nbLikes
                }); 

                self.setState({
                    likePanelStyle: {
                        display: 'block'
                    }
                })
            } else {
                self.setState({
                    likePanelStyle: {
                        display: 'none'
                    }
                }) 
            }
        });
    }
  }

  
    /**
     * Click handler for changing like status 
     * @private 
     */
    _changeLikeStatus(willBeLiked) { 

        var postId = this.props.params.postid || this.props.postId; 
        FirebaseHandler.updateLike(postId, willBeLiked); 


        if (willBeLiked) { 

            this.setState({ 

                likedStyle: {
                    display: 'none'
                }
            })
            this.setState({
                notLikedStyle: {
                    display: 'block'
                }
            })
    
        } else {
            this.setState({
                likedStyle: {
                    display: 'none'
                }
            })
            this.setState({
                notLikedStyle: {
                    display: 'block'
                }
            }) 
            
        }
    }

    /**
     * Given the time of creation of a post returns how long since the creation of the post in text
     * format. e.g. 5d, 10h, now...
     */
    getTimeText(postCreationTimestamp) {
        let millis = Date.now() - postCreationTimestamp;
            const ms = millis % 1000;
            millis = (millis - ms) / 1000;
            const secs = millis % 60;
            millis = (millis - secs) / 60;
            const mins = millis % 60;
            millis = (millis - mins) / 60;
            const hrs = millis % 24;
            const days = (millis - hrs) / 24;
            var timeSinceCreation = [days, hrs, mins, secs, ms];

            let timeText = 'Now';
            if (timeSinceCreation[0] !== 0) {
            timeText = timeSinceCreation[0] + 'd';
            } else if (timeSinceCreation[1] !== 0) {
            timeText = timeSinceCreation[1] + 'h';
            } else if (timeSinceCreation[2] !== 0) {
            timeText = timeSinceCreation[2] + 'm';
            }
            return timeText;
    }
     

    /**
     * Returns the JSX for a post's comment.
     */
        createCommentJsx(author, text) {
            return (
                <div className="fp-comment" key={Math.random() * 10000}>
                    <Link to={"/user/" + author.uid}><span className="fp-author">{author.full_name || 'Anonymous'}</span></Link>:
                    <span className="fp-text"> {text}</span>
                </div>
            )
    }


    render () {
        return (
   
                    <div className="fp-post mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--8-col-desktop mdl-grid mdl-grid--no-spacing">
                      <Theatre picUrl={this.state.post.full_url}></Theatre>
                        <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                            <div className="fp-header">
                                <Link to={"/user/" + this.state.post.author.uid}><span className="fp-usernamelink mdl-button mdl-js-button">
                                    <div className="fp-avatar" style={this.state.avatarStyle}></div>
                                    <div className="fp-username mdl-color-text--black">{this.state.post.author.full_name}</div>
                                </span></Link>

                            <button className="fp-delete-post mdl-button mdl-js-button" disabled={this.state.deleteBtnDisabled} onClick={() => {this.deletePostHandler(this)}} style={this.state.deleteBtnStyle}>
                                    Delete
                                </button>
                            <Link to={"/post/" + this.props.params.postid || this.props.postId}><span className="fp-time">{this.state.textTime}</span></Link>
                            </div>
                            <div className="fp-image" onClick={()=>{this.enterTheatreMode(this)}} style={this.state.thumbStyle}></div>
                            <div className="fp-likes" style={this.state.likePanelStyle}>{this.state.likesCount} like{this.state.likesCount == 1 ? "" : "s"}</div>
                            <div className="fp-first-comment">{this.state.firstComment}</div>
                            <div className="fp-morecomments" style={this.state.nextPageBtnStyle} disabled={this.nextPageBtnDisabled} onClick={() => {this.showMoreComments(this)}}>View more comments...</div>
                            <div className="fp-comments">{
                                this.state.comments.map((comment) => {
                                  
                                    return comment
                                })
                            }</div>
                            <div className="fp-action" style={this.state.commentsFormStyle}>
                                <span className="fp-like">
                                    <div className="fp-not-liked material-icons" onClick={() => {this._changeLikeStatus(true)}} style={this.state.notLikedStyle}>favorite_border</div>
                                    <div className="fp-liked material-icons" onClick={() => {this._changeLikeStatus(false)}} style={this.state.likedStyle}>favorite</div>
                                </span>
                                <form className="fp-add-comment" action="#" onSubmit={(e) => {this.submitCommentHandler(e, this)}}>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" id={this.state.commentId} type="text" value={this.state.newCommentText} onChange={(e)=>{this.commentTextChangeHandler(e, this)}}/>
                                        <label className="mdl-textfield__label" htmlFor={this.state.commentId}>Comment...</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



        )
    }
} 


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteError: appActions.postDeleteError,
        enterTheatreMode: appActions.enterTheatreMode
    }, dispatch)
}

export default withRouter(connect(null, matchDispatchToProps)(SinglePost)); 