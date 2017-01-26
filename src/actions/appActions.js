// auth events 
export const signIn = (user) => {

    return {

        type: 'AUTH_SUCCESS', 
        payload: user
    }
} 

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
} 


// file upload events 
export const upload = (post_data) => {
    return {
        type: 'UPLOAD', 
        payload: post_data
    }
} 

export const uploadSuccess = (data) => { 

    return {
        type: 'UPLOAD_SUCCESS', 
        payload: data 
    } 
}
 
export const uploadError = (data) => { 

    return { 
        type: 'UPLOAD_ERROR', 
        payload: data 
    }
} 

// delete post error 
export const postDeleteError = (data) => { 

    return {
        type: 'DELETE_POST_ERROR', 
        payload: data
    }
} 

export const errorHandled = () => { 
    
    return {
        type: 'DELETE_ERRORHANDLER_DONE'
    }
}

export const clearSuccessData = () => {
      return {
        type: 'CLEAR_SUCCESS_DATA'
    }  
}

// enter theatre mode 
export const enterTheatreMode = (data) => {
    return {
        type: 'ENTER_THEATRE_MODE', 
        payload: data 
    }
} 

// error loading user 
export const userLoadError = (data) => {
    return {
        type: 'USER_LOAD_ERROR', 
        payload: data 
    }
}

export const clearUserError = () => {
    return {
        type: 'CLEAR_USER_ERROR'
    }
}