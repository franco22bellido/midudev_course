import { useEffect, useState } from 'react'
import './App.css'
import Note from './Note'
import {create, getAll} from './services/notes/notes'

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
  const [loading, setLoading] = useState(true)

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

  return (
    <section>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
      {
        loading && 'cargando...'
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
