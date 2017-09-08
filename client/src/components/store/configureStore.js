/**
 * Created by Gabriel Meyer on 07.09.2017.
 */
import {createStore} from 'redux'
import allReducers from '../reducers'

export default function configureStore(initialState){
    return createStore(allReducers, initialState)
}