const conn = require('../connection/index')
const router = require('express').Router()
const token = require('rand-token')

router.post('/history',(req,res)=>{
    let sql = `INSERT INTO history SET ?`
    let data = req.body
    data.id = token.generate(20)
    conn.query(sql,data, (err, result)=>{
        try {
            if(err) throw err
            res.send('berhasil di input')
        } catch (error) {
            res.send({error:error.message})
        }
    })
})

module.exports = router