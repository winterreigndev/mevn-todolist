const { Schema, model } = require('mongoose')

const ToDoListItemSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        taskstatus: {
            type: String,
            required: false,
            default: 'false',
        },
        date: {
            type: Date,
            default: Date.now,
        },
})

const ToDoListItem = model('toDoListItems', ToDoListItemSchema)

module.exports = ToDoListItem