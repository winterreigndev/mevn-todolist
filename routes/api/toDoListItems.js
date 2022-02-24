const { Router } = require('express')
const ToDoListItem = require('../../models/ToDoListItem')

const router = Router()
router.get('/', async (req, res) => {
    try {
        const toDoListItems = await ToDoListItem.find()
        if (!toDoListItems) throw new Error('No toDoListItems')
        const sorted = toDoListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newToDoListItem = new ToDoListItem(req.body)
    try {
        const toDoListItems = await newToDoListItem.save()
        if (!toDoListItems) throw new Error('Something went wrong saving the toDoListItems')
        res.status(200).json(toDoListItems)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await ToDoListItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await ToDoListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router