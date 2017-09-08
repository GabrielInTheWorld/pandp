/**
 * Created by Gabriel Meyer on 07.09.2017.
 */

var socketReducer = (state = {
    socket: null
}, action) => {
    switch(action.type){
        case 'create_socket':
            console.log("socketReducer: ", action.newSocket)
            // return [
            //     ...state,
            //     Object.assign({}, action.newSocket)
            // ]
            return Object.assign({}, state, {
                socket: action.newSocket
            })
        default:
            return state
    }
}

export default socketReducer