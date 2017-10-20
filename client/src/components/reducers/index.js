import {combineReducers} from 'redux'

import memberReducer from './memberReducer'
import socketReducer from './socketReducer'
import storageReducer from './storageReducer'

const allReducers = combineReducers({
    members: memberReducer,
    socket: socketReducer,
    storage: storageReducer
})

export default allReducers