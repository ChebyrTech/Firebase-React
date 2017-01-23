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
            break; 
        }
        case "SIGN_OUT": { 

            var newState = {
                user: {
                        uid: "", 
                        photoUrl: "", 
                        displayName: "" 
                    } 
            }
            return newState; 
            break;

        } 
        
    }

    return state; 
} 

export default authReducer;  