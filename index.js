const express = require('express')
const { dbConnection } = require('./db/config')
require('dotenv').config()
const cors = require('cors')
//servidor de expres
const app = express()

//DB

dbConnection()

//cors

app.use(cors())

//Directorio publico

app.use(express.static('public'))


//Lectura y parseo

app.use(express.json())

//rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//rescuchar peticiones

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

