import { createStore, combineReducers, applyMiddleware } from 'redux'

import authReducer from './reducers/auth.js'
import uploadReducer from './reducers/uploader.js' 
import feedReducer from './reducers/feed.js'
import userReducer from './reducers/user.js' 


let allreducers = combineReducers({
    auth: authReducer, 
    upload: uploadReducer, 
    feed: feedReducer, 
    user: userReducer
})


const store = createStore(allreducers); 

export default store;  

