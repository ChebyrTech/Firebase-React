import { createStore, combineReducers } from 'redux'

import authReducer from './reducers/auth.js'

let allreducers = combineReducers({
    auth: authReducer 
})

const store = createStore(allreducers); 

export default store; 