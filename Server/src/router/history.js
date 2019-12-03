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
            res.send({error:error.sqlmessage})
        }
    })
})

router.get('/history',(req,res)=>{
    
    let sql = `SELECT u.username, d.divisi, h.description, h.type, h.tanggal 
    FROM history h join users u on h.user_id = u.id 
    join karyawan k 
    on u.id = k.id_user
    join divisi d on d.id = k.divisi_id 
    Order by h.tanggal desc`
    conn.query(sql, (err,result) =>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error:error.sqlmessage})
        }
    })
})

router.get('/history/:divisi',(req,res)=>{
    let sql = `SELECT u.username, d.divisi, h.description,h.type, h.tanggal 
    FROM history h join users u on h.user_id = u.id 
    join karyawan k 
    on u.id = k.id_user
    join divisi d on d.id = k.divisi_id 
    WHERE d.divisi = '${req.params.divisi}'
    Order by h.tanggal desc`
    conn.query(sql, (err,result) =>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error:error.sqlmessage})
        }
    })
})

router.get('/history/profile/:username',(req,res)=>{
    let sql = `SELECT u.username, d.divisi, h.description,h.type, h.tanggal 
    FROM history h join users u on h.user_id = u.id 
    join karyawan k 
    on u.id = k.id_user
    join divisi d on d.id = k.divisi_id 
    WHERE u.username = '${req.params.username}'
    Order by h.tanggal desc`
    conn.query(sql, (err,result) =>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error:error.sqlmessage})
        }
    })
})


module.exports = router