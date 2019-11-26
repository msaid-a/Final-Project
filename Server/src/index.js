const express = require('express')

const karyawan = require('./router/karyawan')
const tugas = require('./router/tugas')
const gaji = require('./router/gaji')
const divisi = require('./router/divisi')
const history = require('./router/history')
const jwt = require('jsonwebtoken')

const app = express()
const cors = require('cors')
const port = 2020


app.use(express.json())
app.use(cors())
app.use(karyawan)
app.use(gaji)
app.use(tugas)
app.use(divisi)
app.use(history)


app.listen(port, () => {
    console.log(`Running in port ${port}`)
})