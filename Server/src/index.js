const express = require('express')

const karyawan = require('./router/karyawan')
const tugas = require('./router/tugas')
const gaji = require('./router/gaji')
const divisi = require('./router/divisi')

const app = express()
const cors = require('cors')
const port = 2222


app.use(express.json())
app.use(cors())
app.use(karyawan)
app.use(gaji)

app.listen(port, () => {
    console.log(`Running in port ${port}`)
})