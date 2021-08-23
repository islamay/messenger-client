import axios from "axios";
import { API_URL } from "../../../helpers/env";

const updateUser = () => {

    const login = JSON.parse(localStorage.getItem("login"));

    const config = {
        headers: {
            authorization: `Bearer ${login.token}`
        }
    }

    axios.get(`${API_URL}/user/find-by-token`, config)
        .then(result => {
            localStorage.clear()
            const newLoginInfo = { token: login.token, publicProfile: result.data }
            localStorage.setItem('login', JSON.stringify(newLoginInfo))
        })
        .catch(() => {
            console.log('Youre fucked up');
        })
}

export default updateUser