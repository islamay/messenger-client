import axios from "axios";
import { API_URL } from "../../helpers/env";

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

export const startChat = (setUser) => {


  return async (e) => {
    console.log("Start Chat");
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
        setUser(login.publicProfile)
        return console.log(res);
      }

    } catch (error) {
      console.log(error.response);
    }
  }

}

export const showMessages = ({ setRoom, setFocusRoom }) => {

  return async (e) => {
    console.log('Show Message');
    setRoom({
      avatarSrc: e.currentTarget.dataset.avatarSrc,
      roomName: e.currentTarget.dataset.roomName,
    });
    setFocusRoom(e.currentTarget.dataset.roomId)



  }
}

export const fetchGeneralMessage = async (setGeneralMessage, roomData) => {
  if (!roomData) return null
  console.log('Fetch General Message');

  let login = JSON.parse(localStorage.getItem('login'))

  const config = {
    headers: {
      authorization: `Bearer ${login.token}`
    }
  }

  let messagesPromises = []

  roomData !== 0 && roomData.forEach((room) => {
    const messagePromise = axios.get(`${API_URL}/room/get/messages/${room.roomId}`, config)
    messagesPromises.push(messagePromise)
  })

  const messagesRaw = await Promise.all(messagesPromises)
  const messages = messagesRaw.map((message) => {
    return message.data
  })

  setGeneralMessage(messages)
}

export const handleSendMessage = (message, setMessageInput, setRoomMessage, focusRoom) => {

  return async (e) => {
    console.log('Send Message');
    e.preventDefault()
    setMessageInput('')

    const login = JSON.parse(localStorage.getItem("login"));

    const config = {
      headers: {
        authorization: `Bearer ${login.token}`
      }
    }

    try {
      await axios.post(`${API_URL}/message/send`,
        {
          message,
          roomId: focusRoom
        },
        config
      )

    } catch (error) {
      console.log(error.response);
    }

  }

}