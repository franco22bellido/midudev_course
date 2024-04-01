const express = require('express')
const app = express()

const notes = [
    {
        "id": 1,
        "content": "estudiar pruebas e2e",
        "date": "1/04/2024",
        "important": true
    },
    {
        "id": 2,
        "content": "estudiar cypress",
        "date": "2/04/2024",
        "important": true
    },
    {
        "id": 3,
        "content": "practicar sockets con nestJs",
        "date": "07/04/2024",
        "important": true
    }
]

app.get('/', (req, res)=> {
    res.send('<h1>hello world</h1>')
})

app.get('/api/notes', (req, res)=> {
    res.json(notes)
})
app.get('/api/notes/:id', (req, res)=> {
    const id = parseInt(req.params.id)
    const note = notes.find((note)=> note.id === id)
    if(!note){
        res.status(404).end()
    }
    res.json({
        note
    })
})
app.delete('/api/notes/:id', (req, res)=> {
    const id = parseInt(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
})