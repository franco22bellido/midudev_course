import axios from 'axios'

let basicUrl = 'http://localhost:3002/api/notes'

let token = ''
export const setToken = (newToken)=> {
  token = newToken
}

export const create = ({content})=> {
    return axios.post(basicUrl, {content},
  {headers: { Authorization :  `Bearer ${token}`}})
    .then((response)=> {
        const {data} = response
        return data
    })
}
export const getAll = ()=>  axios.get(basicUrl, 
{headers: { Authorization :  `Bearer ${token}`}})
.then((response) => {
  const { data } = response
  return data
})