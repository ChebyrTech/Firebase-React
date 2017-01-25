import store from '../store' 

    var upload_index = 0, 
    error_index = 0;

    const uploadReducer = (state = {
        index: 0, 
        image: '', 
        filename: '', 
        successData: {}, 
        errorData: {}
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

                var new_index = ++upload_index; 
     

                var newState = {
                    filename: action.payload.filename, 
                    index: new_index,  
                    image: img 
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
            // upload error event 
            case 'UPLOAD_ERROR': { 
                
                var errorData = action.payload; 
                errorData.index = ++error_index; 
                

                var newState = Object.assign({}, state, {
                    errorData: errorData
                }) 

                return newState; 
            }
        } 
        return state; 
    } 

    export default uploadReducer; 