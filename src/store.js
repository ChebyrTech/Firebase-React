import { createStore, combineReducers, applyMiddleware } from 'redux'

import authReducer from './reducers/auth.js'
import uploadReducer from './reducers/uploader.js'

let allreducers = combineReducers({
    auth: authReducer, 
    upload: uploadReducer 
})



const store = createStore(allreducers); 

window.store = store; 

export default store;  

