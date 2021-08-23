import axios from "axios";
import { API_URL } from "../../../helpers/env";

const fetchRoomData = async (setRoomData) => {
    console.log('Fetch Room Data');
    const login = JSON.parse(localStorage.getItem("login"));


    const config = {
        headers: {
            authorization: `Bearer ${!!login && login.token}`,
        },
    };
    try {
        let datas = []
        login.publicProfile.rooms.forEach((room) => {
            datas.push(axios.get(`${API_URL}/room/get/${room.roomId}`, config))
        })

        let roomDetails = await Promise.all(datas)
        roomDetails = roomDetails.map((roomDetail) => {
            return {
                roomName: roomDetail.data.username,
                avatarSrc: roomDetail.data.imgSrc,
                roomId: roomDetail.data.roomId
            }
        })

        setRoomData(roomDetails)

    } catch (error) {

    }

    return () => {
        console.log('Cleaned Up');
    }

}

export default fetchRoomData;