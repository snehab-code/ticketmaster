const express = require('express')
const setup = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const app = express()
const port = 3030


setup()
app.use(express.json())
app.use(cors())
app.use('/', router)


app.listen(port, () => {
    console.log('listening on port ', port)
})

