import { useEffect, useState } from 'react'
import './App.css'
import Note from './Note'
import { create, getAll } from './services/notes/notes'
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

  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    create({
      title: newNote,
      body: newNote,
      userId: 1
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
      setUser(data)

      console.log(data)
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

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={({target}) => setNewNote(target.value)} value={newNote} />
        <button>Save</button>
      </form>
      {
        loading && 'loading...'
      }
      <ul>
        {
          notes.map(note => (<Note key={note.id} title={note.title} body={note.body} />))
        }
      </ul>
    </section>
  )
}

export default App
