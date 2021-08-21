import { API_URL } from "../../helpers/env";
import { io } from 'socket.io-client';

const socketLogic = (handleUpdate) => {
    const rooms = JSON.parse(localStorage.getItem('login')).publicProfile.rooms
    const roomIds = rooms.map(room => {
        return room.roomId
    })



    console.log(roomIds);

    const socket = io(`${API_URL}`, {
        path: '/socket.io/socket.io.js'
    })

    socket.on('connect_error', (error) => {
        console.log(error);
    })

    socket.emit('joinRooms', roomIds)

    socket.on('newMessage', (newMessage) => {
        console.log("New Message!");
    })

}

export default socketLogic