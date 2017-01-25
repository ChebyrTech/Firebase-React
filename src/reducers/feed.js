const feedReducer = (state = {
    feed: {
        
    }
}, action) => {
    switch(action.type) {

        case 'DELETE_POST_ERROR': {

            var newState = action.payload; 
            return newState; 
        }
        case 'DELETE_ERRORHANDLER_DONE': {
            var newState = {}; 
            return newState
        }
    } 

    return state; 
}

export default feedReducer; 