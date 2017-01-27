import store from '../store' 

    var error_index = 0;

    const uploadReducer = (state = {
        index: 0, 
        image: '', 
        filename: '', 
        successData: {}, 
        errorData: {}, 
        newUpload: null
    }, action) => {
        switch (action.type) { 

            // upload event 
            case "UPLOAD": { 


                var new_index = Math.random() * 100000; 
                

                var newState = {
                    filename: action.payload.file.filename, 
                    index: new_index,  
                    image: action.payload.image, 
                    newUpload: true  
                } 

       
                return newState; 
            }
            // upload success event
            case 'UPLOAD_SUCCESS': {

                var newState = Object.assign({}, state, {
                    successData: action.payload
                }) 

                return newState; 
            } 
            case 'CLEAR_SUCCESS_DATA': {
              var newState = Object.assign({}, state)

              return newState 
             }
            // upload error event 
            case 'UPLOAD_ERROR': { 
                
                var errorData = action.payload; 

                ++error_index;   
                if (upload_index > 100) { upload_index = 1 }

                errorData.index = error_index; 
                

                var newState = Object.assign({}, state, {
                    errorData: errorData
                }) 

                return newState; 
            }
            // clear upload error 
            case 'CLEAR_UPLOAD_ERROR': {

                var newState = Object.assign({},state); 
                newState.errorData = null; 

                return newState; 
            }
        } 
        return state; 
    } 

    export default uploadReducer; 