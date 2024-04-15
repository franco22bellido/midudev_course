import Note from "../Note"

const Notes = ({ notes = [] }) => {


    return (
        <>
        {
            notes.length > 0 ?
                <ul>
                {
                    notes.map(note => (<Note key={note._id} content={note.content} />))
                }
                </ul>
                : <p>no hay notas que mostrar</p>
        }
        </>
    )
}

export default Notes
