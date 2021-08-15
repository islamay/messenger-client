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

export const fetchRoomData = async (setRoomData) => {
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

export const startChat = (setUser) => {


  return async (e) => {
    e.preventDefault()
    const interlocutorUsername = e.target.elements.findUserInput.value

    let login = JSON.parse(localStorage.getItem('login'))

    const config = {
      headers: {
        authorization: `Bearer ${login.token}`
      }
    }

    try {

      const roomRequest = await axios.post(`${API_URL}/room/private/create`, {
        interlocutorUsername
      }, config)

      if (roomRequest.status === 201) {
        const res = await axios.get(`${API_URL}/user/find-by-token`, config)

        login.publicProfile = res.data
        localStorage.setItem('login', JSON.stringify(login))
        setUser(login)
        return console.log(res);
      }

    } catch (error) {
      console.log(error.response);
    }
  }

}

export const showMessages = ({ setRoom, setFocusRoom, setMessages }) => {

  return async (e) => {

    setRoom({
      avatarSrc: e.currentTarget.dataset.avatarSrc,
      roomName: e.currentTarget.dataset.roomName,
    });
    setFocusRoom(e.currentTarget.dataset.roomName)


  }
}



const socket = io(`${API_URL}`, {
  path: '/socket.io/socket.io.js'
})

socket.on('connect_error', (error) => {
  console.log(error);
})