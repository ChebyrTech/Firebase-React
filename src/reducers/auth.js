const authReducer = (state = {
    user: {
        uid: '', 
        photoUrl: '', 
        displayName: '' 
    }

}, action) => {

    switch (action.type) { 

        case "AUTH_SUCCESS": {
            
            var newState = {
                user: {
                    uid: action.payload.uid, 
                    photoUrl: action.payload.photoURL, 
                    displayName: action.payload.displayName
                }

            } 

            return newState; 

        }
        case "SIGN_OUT": { 

            var newState = {
                user: {
                        uid: "", 
                        photoUrl: "", 
                        displayName: "", 
                        signOut: true 
                    } 
            }
        
            return newState; 


        } 
        
    }

    return state; 
} 

export default authReducer;  