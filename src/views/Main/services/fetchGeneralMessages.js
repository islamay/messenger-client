import axios from "axios";
import { API_URL } from "../../../helpers/env";

const fetchGeneralMessage = async (setGeneralMessage, roomData) => {
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

export default fetchGeneralMessage;