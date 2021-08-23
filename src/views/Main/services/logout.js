import axios from 'axios';
import { API_URL } from "../../../helpers/env";

const logout = async () => {
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


export default logout;