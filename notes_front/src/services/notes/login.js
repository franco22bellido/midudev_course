import axios from 'axios'

const baseUrl = 'http://localhost:3002/api/auth'

export const login = async (credentials)=> {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}