import { useEffect, useState } from 'react'
import './App.css'
import Note from './Note'
import { create, getAll } from './services/notes/notes'

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
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

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

  const handleLoginSubmit = (e)=> {
    e.preventDefault()
    console.log("is submitiiiiing", username, password)
  }
  return (
    <section>
      <h1 style={{ color: "green" }}>Notes</h1>

      <h2 style={{color: "green"}}>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input 
          type="text"
          placeholder='username'
          value={username}
          name='username'
          onChange={({target})=> setUsername(target.value)} />
          <input 
          type="password"
          placeholder='password'
          value={password}
          name='password'
          onChange={({target})=> setPassword(target.value)} />
          <button>Login</button>
        </form>

      <button
        onClick={() => setShowAll((showAll) => !showAll)}>{showAll ? 'show important' : 'show all'}</button>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
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
