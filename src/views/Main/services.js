import axios from "axios";
import { API_URL } from "../../helpers/env";
import { io } from 'socket.io-client'

export const authUser = (props) => {
  const login = JSON.parse(localStorage.getItem("login"));
  if (!login) return props.history.push("/auth");
};



export const logout = async () => {
  const login = JSON.parse(localStorage.getItem("login"));

  const config = {
    headers: {
      authorization: `Bearer ${login.token}`,
    },
  };

  try {
    await axios.post(`${API_URL}/user/logout`, {}, config);
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    console.log("something error");
    console.log(error.response);
  }
};

export const fetchRoomData = (setRoomData) => {
  return async () => {
    const login = JSON.parse(localStorage.getItem("login"));


    const config = {
      headers: {
        authorization: `Bearer ${!!login && login.token}`,
      },
    };
    try {
      let datas = []
      login.publicProfile.rooms.forEach((room) => {
        datas.push(axios.post(`${API_URL}/room/get`, { roomId: room.roomId }, config))
      })

      let roomDetails = await Promise.all(datas)
      roomDetails = roomDetails.map((roomDetail) => {
        return {
          roomName: roomDetail.data.username,
          avatarSrc: roomDetail.data.imgSrc
        }
      })

      setRoomData(roomDetails)

    } catch (error) {

    }

    return () => {
      console.log('Cleaned Up');
    }
  }
}

const socket = io(`${API_URL}`, {
  path: '/socket.io/socket.io.js'
})

socket.on('connect_error', (error) => {
  console.log(error);
})