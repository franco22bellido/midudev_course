import { useState } from "react"
import { create } from "../services/notes/notes"
import Toggable from "./Toggable"

const NoteForm = ({ setNotes }) => {
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

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

    return (
        <Toggable buttonLabel={'New note'}>
            <button
            onClick={() => setShowAll((showAll) => !showAll)}>{showAll ? 'show important' : 'show all'}</button>
            <form onSubmit={handleSubmitNote}>
                <input type='text' onChange={({ target }) => setNewNote(target.value)} value={newNote} />
                <button>Save</button>
            </form>
        </Toggable>
    )
}

export default NoteForm
