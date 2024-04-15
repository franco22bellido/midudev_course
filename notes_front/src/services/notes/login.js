import axios from "axios";

let urlBasic = 'http://localhost:3002/api/auth'

export const login = ({username, password})=> axios.post(urlBasic, {
    username, password
})