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
export const upload = (file, image) => {
    return {
        type: 'UPLOAD', 
        payload: {
            file: file, 
            image: image 
        }
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

export const clearUploadError = () => {
    return {
        type: 'CLEAR_UPLOAD_ERROR'
    }
}

// delete post error 
export const postDeleteError = (data) => { 

    return {
        type: 'DELETE_POST_ERROR', 
        payload: data
    }
} 

// delete post success 
export const postDeleteSuccess = () => {

    return {
        type: 'DELETE_POST_SUCCESS' 
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
 
// show notification 
export const showNotification = (data) => {
    return {
        type: 'NOTIFICATION', 
        payload: data
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}