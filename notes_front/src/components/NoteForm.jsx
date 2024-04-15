import { useState } from "react"
import { create } from "../services/notes/notes"

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
        <>
            <button
            onClick={() => setShowAll((showAll) => !showAll)}>{showAll ? 'show important' : 'show all'}</button>
            <form onSubmit={handleSubmitNote}>
                <input type='text' onChange={({ target }) => setNewNote(target.value)} value={newNote} />
                <button>Save</button>
            </form>
        </>
    )
}

export default NoteForm
