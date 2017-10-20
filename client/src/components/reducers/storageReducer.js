/**
 * Created by Gabriel Meyer on 21.10.2017.
 */

var storageReducer = (state = {
    storage: null
}, action) => {
    switch(action.type){
        case 'create_storage':
            console.log("storageReducer: ", action.newStorage)
            // return [
            //     ...state,
            //     Object.assign({}, action.newSocket)
            // ]
            return Object.assign({}, state, {
                storage: action.newStorage
            })
        default:
            return state
    }
}

export default storageReducer