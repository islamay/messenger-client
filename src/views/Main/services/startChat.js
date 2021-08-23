import axios from "axios";
import { API_URL } from "../../../helpers/env";

const startChat = (setUser) => {


    return async (e) => {
        alert('please wait')
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

            if (roomRequest.status === 201 || roomRequest.status === 200) {
                const res = await axios.get(`${API_URL}/user/find-by-token`, config)

                login.publicProfile = res.data
                localStorage.setItem('login', JSON.stringify(login))
                setUser(login.publicProfile)
                window.location.reload()
                return console.log(res);
            }

        } catch (error) {
            alert('user not found')
            console.log(error.response);
        }
    }

}

export default startChat;