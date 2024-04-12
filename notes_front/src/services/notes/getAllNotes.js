import axios from "axios"

export const getAllNotes = ()=>  axios.get('https://jsonplaceholder.typicode.com/posts')
.then((response) => {
  const { data } = response
  return data
})