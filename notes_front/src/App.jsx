import { useState } from 'react'
import './App.css'
import Note from './Note'


function App(props) {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  if (typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar"
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
  const handleShowAll = ()=> {
    setShowAll(()=> !showAll)
  }
  return (
    <section>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? 'Show all' : 'show important only'}</button>
      <ul>
        {notes.filter((note)=> showAll ? true : note.important === true)
        .map((note, i) => (<Note key={note.id} content={note.content} date={note.date} />))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
    </section>
  )
}

export default App
