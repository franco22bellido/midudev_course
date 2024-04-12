import { useEffect, useState } from 'react'
import './App.css'
import Note from './Note'
import { create, getAll, setToken } from './services/notes/notes'
import { login } from './services/notes/login'


function App() {

  useEffect(() => {
    setTimeout(() => {
      getAll().then((notes) => {
        setNotes(notes)
        setLoading(false)
      })
    }, 2000);
  }, [])
  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('USER_LOCAL_STORAGE')
    if(loggedUserJSON) {
      const userJSON = JSON.parse(loggedUserJSON)
      setUser(userJSON)
      setToken(userJSON.token)
    }
  }, [])

  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const handleSubmitNote = (e) => {
    e.preventDefault()
    create({
      content: newNote,
    })
      .then(note => {
        return setNotes(notes => [...notes, note])
      })
    setNewNote('')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login({ username, password })
      console.log(data)
      window.localStorage.setItem(
        'USER_LOCAL_STORAGE', JSON.stringify(data)
      )
      setToken(data.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000);
    }

  }
  return (
    <section>
      <h1 style={{ color: "green" }}>Notes</h1>

      {error && (<p>{error}</p>)}

      <h2 style={{ color: "green" }}>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder='username'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)} />
        <input
          type="password"
          placeholder='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)} />
        <button>Login</button>
      </form>

      <button
        onClick={() => setShowAll((showAll) => !showAll)}>{showAll ? 'show important' : 'show all'}</button>

      <form onSubmit={handleSubmitNote}>
        <input type='text' onChange={({ target }) => setNewNote(target.value)} value={newNote} />
        <button>Save</button>
      </form>
      {
        loading && 'loading...'
      }
      <ul>
        {
          notes.map(note => (<Note key={note._id} content={note.content} />))
        }
      </ul>
    </section>
  )
}

export default App
