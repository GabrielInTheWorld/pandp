/**
 * Created by Gabriel Meyer on 07.09.2017.
 */

var memberReducer = (state = {
    members: []
}, action) => {
    // console.log("memberReducer - state: ", state)
    let members = this.members
    switch (action.type) {
        case 'add_user':
            // console.log("memberReducer: ", action.member, members)
            // return [
            //     ...state,
            //     Object.assign({}, action.member)
            // ]
            return [
                ...state,
                action.member
            ]
        default:
            return state
    }
}

export default memberReducer