import axios from "axios";
import { API_URL } from "../../../helpers/env";

const handleSendMessage = (message, setMessageInput, setRoomMessage, focusRoom) => {

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

export default handleSendMessage