import './App.css'
import { useEffect, useState } from 'react'
import { getAll, setToken } from './services/notes/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import ErrorMessage from './components/ErrorMessage'
import Notes from './components/Notes'
import LogOut from './components/LogOut'
import Toggable from './components/Toggable'



function App() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('USER_LOCAL_STORAGE')
    if (loggedUserJSON) {
      const userJSON = JSON.parse(loggedUserJSON)
      setUser(userJSON)
      setToken(userJSON.token)
    }
  }, [])
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      getAll().then((notes) => {
        setNotes(notes)
        setLoading(false)
      })
        .catch((e) => {
          console.log(e)
          setNotes([])
          setLoading(false)
        })
    }, 2000);
  }, [user])




  return (
    <section>
      <h1 style={{ color: "green" }}>Notes</h1>

      <ErrorMessage error={error} />
      {
        user ?
          <>
            <NoteForm setNotes={setNotes} />
            <LogOut setToken={setToken} setUser={setUser} />
            {
              loading && 'loading...'
            }
            <Notes notes={notes} />
          </>
          :
          <LoginForm setError={setError} setToken={setToken} setUser={setUser} />

      }
    </section>
  )
}

export default App
