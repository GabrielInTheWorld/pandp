import {combineReducers} from 'redux'

import memberReducer from './memberReducer'
import socketReducer from './socketReducer'

const allReducers = combineReducers({
    members: memberReducer,
    socket: socketReducer
})

export default allReducers