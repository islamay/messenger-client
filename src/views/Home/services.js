import axios from 'axios'

export const login = ({ username, password }) => {
    console.log(username);
}

export const signup = async ({ username, email, password }) => {
    try {
        const result = await axios.post('http://localhost:3001/user/signup', { username, email, password })
        console.log(result.data);
    } catch (error) {
        console.log('A');
    }
}