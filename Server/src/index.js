const express = require('express')

const karyawan = require('./router/karyawan')
const tugas = require('./router/tugas')
const gaji = require('./router/gaji')
const divisi = require('./router/divisi')
const history = require('./router/history')
const jwt = require('jsonwebtoken')
const public = require('./router/public')
const dasboard = require('./router/dasboard')
const app = express()
const cors = require('cors')
const port = 2020

const authentication = () =>{
    app.set('Secret', 'hjlkdsahjsahdkjahdslkj');
        app.use((req, res, next) => {
            let token = req.headers['keys'];
            if (token) {
                jwt.verify(token, app.get('Secret'), (err, decoded) => {
                    if (err) {
                        return res.send({ success: false, error: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    error: 'No token provided.'
                });
            }
        });
}

app.use(express.json())
app.use(cors())
app.use(public)
authentication()
app.use(dasboard)
app.use(karyawan)
app.use(gaji)
app.use(tugas)
app.use(history)
app.use(divisi)


// INstantiating the express-jwt middleware


app.listen(port, () => {
    console.log(`Running in port ${port}`)
})

