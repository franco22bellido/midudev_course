import { useState } from 'react'
import './App.css'
import Note from './Note'


function App(props) {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  if (typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar"
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleClick = () => {
    console.log("crear nota")
    console.log(newNote)
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random < 0.5
    }
    setNotes([...notes, noteToAddToState])
    setNewNote('')
  }
  return (
    <section>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => (<Note key={note.id} content={note.content} date={note.date} />))}
      </ul>
      <div>
        <input type='text' onChange={handleChange} value={newNote} />
        <button onClick={handleClick}>Crear nota</button>
      </div>

    </section>
  )
}

export default App
