require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000
const path = require('path')
const cors = require('cors')
const router = require('./modules')

app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.resolve(__dirname, '..','public')))
app.use('/api/v1', router)

app.listen(PORT, console.log(PORT))