import './App.css'
import { useEffect, useState } from 'react'
import { getAll, setToken } from './services/notes/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import ErrorMessage from './components/ErrorMessage'
import Notes from './components/Notes'


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


  const handleLogOut = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('USER_LOCAL_STORAGE')
  }


  return (
    <section>
      <h1 style={{ color: "green" }}>Notes</h1>

      <ErrorMessage error={error}/>

      <LoginForm setError={setError} setToken={setToken} setUser={setUser} />

      <button onClick={() => handleLogOut()}>LogOut</button>

      <NoteForm setNotes={setNotes}/>
      {
        loading && 'loading...'
      }
      <Notes notes={notes}/>
    </section>
  )
}

export default App
