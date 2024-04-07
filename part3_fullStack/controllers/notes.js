const { Router } = require('express')
const notesRouter = Router()
const Note = require('../models/NoteSchema')

notesRouter.get('/', async (req, res) => {
    const notesFound = await Note.find({})
    if (!notesFound) {
        return res.status(404).json({ message: 'notes not found' })
    }
    res.status(200).json(notesFound)
})
notesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        const noteFound = await Note.findById(id)
        if (!noteFound) return res.status(404).end()
        res.status(200).json(noteFound)
    } catch (error) {
        next(error)
    }
})
notesRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const noteDeleted = await Note.findByIdAndDelete(id)
        if (!noteDeleted) {
            return res.status(404).end()
        }
        return res.status(204).end()
    } catch (error) {
        next(error)
    }
})
notesRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const note = req.body

    const newNoteValues = {
        _id: id,
        content: note.content,
        important: note.important
    }
    try {
        const noteFound = await Note.findById(id)
        if (!noteFound) return res.status(404).end()
        const noteUpdate = await Note.updateOne(newNoteValues)
        return res.status(200).json(noteUpdate)
    } catch (error) {
        next(error)
    }
})
notesRouter.post('/', async (req, res, next) => {
    const note = req.body

    if (!note.content) {
        return res.status(400).json({ message: 'content is required' })
    }

    const newNote = new Note({
        content: note.content,
        date: Date.now(),
        important: typeof note.important !== 'undefined' ? note.important : false
    })

    try {
        const savedNote = await newNote.save()
        res.status(200).json(savedNote)
    } catch (error) {
        next(error)
    }
})

module.exports = notesRouter
