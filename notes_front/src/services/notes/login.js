import axios from "axios";

let urlBasic = 'http://localhost:3002/api/auth'

export const login = async ({username, password})=> {
    const response = await axios.post(urlBasic, {
                            username, password})
    return response.data
}