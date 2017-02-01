var view_index = 0;

const feedReducer = (state = {
    picUrl: '', 
    errorData: null, 
    index: 0, 
    deleted: null
}, action) => {
    switch(action.type) {

        case 'DELETE_POST_ERROR': {

            var newState = {
                picUrl: '', 
                errorData: action.payload, 
                index: view_index, 
                deleted: null 
            }
            return newState; 
        }
        case 'DELETE_ERRORHANDLER_DONE': {
            var newState = {
                picUrl: '', 
                errorData: null, 
                index: view_index, 
                deleted: null
            }
            return newState
        }
        case 'DELETE_POST_SUCCESS': {
        
            var newState = {
                picUrl: '', 
                errorData: null, 
                index: view_index, 
                deleted: true
            }
            return newState
        }
        case 'ENTER_THEATRE_MODE': { 

            ++view_index; 
            if (view_index> 100) view_index = 0;

            var newState = {
                picUrl: action.payload, 
                errorData: null, 
                index: view_index, 
                deleted: null
            }
            return newState; 
       }

    } 

    return state; 
}

export default feedReducer; 