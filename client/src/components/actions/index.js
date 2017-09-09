/**
 * Created by Gabriel Meyer on 07.09.2017.
 */
export const addUser = (user) => {
    return{
        type: 'add_user',
        member: user
    }
}

export const createSocket = (socket) => {
    return {
        type: 'create_socket',
        newSocket: socket
    }
}

export const receiveMessage = (message, receiver) => {
    return{
        type: 'receive_message',
        message: message,
        receiver: receiver
    }
}