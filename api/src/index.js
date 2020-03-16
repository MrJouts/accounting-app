const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// settings
app.set('port', process.env.PORT || 3001)

// midelwares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// routes
app.use('/api/cards', require('./routes/cards'))
app.use('/api/transactions', require('./routes/transactions'))

// starting the server
app.listen(3001, () => {
  console.log(`server on port ${app.get('port')}`)
})