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
    }

    return state; 
}

export default userReducer