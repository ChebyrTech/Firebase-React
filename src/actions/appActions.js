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

    console.log('upload success')
    console.log(data)
    return {
        type: 'UPLOAD_SUCCESS', 
        payload: data 
    } 
}
 
export const uploadError = (data) => { 

    console.log('upload error')
    console.log(data)
    return { 
        type: 'UPLOAD_ERROR', 
        payload: data 
    }
}

