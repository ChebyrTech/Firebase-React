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

                // read image data 
                var img_reader = new Promise(function(resolve, reject) {

                    var file = action.payload; 
                    
                    if (file.type.match('image.*')) {
                    var reader = new FileReader(); 
                    var image; 
                    reader.readAsDataURL(file); 
                        reader.onload = (e) => {
                            
                            image = e.target.result;
                            resolve(image) 

                        }  
                     }

                })
                
                var img = img_reader.then(function(image) { 

                    return image; 

                }) 

                var new_index = Math.random() * 100000; 
                

                var newState = {
                    filename: action.payload.filename, 
                    index: new_index,  
                    image: img, 
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
        } 
        return state; 
    } 

    export default uploadReducer; 