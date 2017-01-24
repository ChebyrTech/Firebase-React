import store from '../store' 

    var upload_index = 0; 

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

                console.log('image upload event')

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
                break; 
            }
            // upload success event
            case 'UPLOAD_SUCCESS': {

                break; 
            }
            // upload error event 
            case 'UPLOAD_ERROR': {

                break; 
            }
        } 
        return state; 
    } 

    export default uploadReducer; 