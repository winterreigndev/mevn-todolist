//our dependencies and required
const express = require('express')
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

//connect to our database
mongoose 
    .connect(mongoUri)
    .then(() => console.log('MongoDB database connected...'))
    .catch((err) => console.log(err))


//app use
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


//required apis
const toDoListItemRoutes = require('./routes/api/toDoListItems')
app.use('/api/toDoListItems', toDoListItemRoutes)


//listen on port message
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`))