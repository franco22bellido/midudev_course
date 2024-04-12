import axios from 'axios'

const baseUrl = 'http://localhost:3002/api/notes'

let token = null
export const setToken = (newToken)=> {
  token = newToken
}

export const create = ({content})=> {

    return axios.post(baseUrl, {content}, {
      headers: {Authorization : `Bearer ${token}`}
    })
    .then((response)=> {
        const {data} = response
        return data
    })
}
export const getAll = ()=>  axios.get(baseUrl)
.then((response) => {
  const { data } = response
  return data
})