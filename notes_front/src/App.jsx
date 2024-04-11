import { useEffect, useState } from 'react'
import './App.css'
import Note from './Note'
import axios from 'axios'


function App() {

  useEffect(() => {
    setTimeout(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          const { data } = response
          setNotes(data)
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
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }
    axios
      .post('https://jsonplaceholder.typicode.com/posts', noteToAddToState)
      .then(response => {
        const { data } = response
        setNotes(notes => notes.concat(data))
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
