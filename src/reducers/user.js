const userReducer = (state = {
    errorData: null
}, action) => { 

    switch (action.type) {
        case 'USER_LOAD_ERROR': {

            var newState = {
                errorData: action.payload
            }

            return newState

        }
        case 'CLEAR_USER_ERROR': {
            
            var newState = {
                errorData: null
            } 
            return newState
        } 
        case 'NOTIFICATION': {
            var newState = {
                errorData: null, 
                notificationData: action.payload
            } 

            return newState
        }
        case 'CLEAR_NOTIFICATION': {
            var newState = {
                errorData: null, 
                notificationData: null
            }
        }
    }

    return state; 
}

export default userReducer