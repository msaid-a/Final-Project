const conn = require('../connection/index')
const router = require('express').Router()
const token = require('rand-token')


router.post('/divisi',(req, res)=>{
    let sql = `INSERT INTO divisi SET ?`
    let data = req.body
        data.id = token.generate(20)
    conn.query(sql, data, (err, result)=>{
        try {
            if(err) throw err
            res.send('Berhasil Menambahkan')
        } catch (error) {
            res.send({error: error})
        }
    })
})

router.get('/divisi',(req,res)=>{
    let sql = `SELECT * FROM divisi WHERE is_deleted = 0`
    conn.query(sql, (err,result)=>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error: error})
        }
    })
})

router.post('/subdivisi',(req, res)=>{
    let sql = `INSERT INTO subDivisi SET ?`
    let data = req.body
        data.id = token.generate(20)
    conn.query(sql, data, (err, result)=>{
        try {
            if(err) throw err
            res.send('Berhasil Menambahkan')
        } catch (error) {
            res.send({error: error})
        }
    })
})

router.get('/subdivisi',(req,res)=>{
    let sql = `SELECT * FROM subDivisi join divisi on divisi.id = subDivisi.divisi_id`
    conn.query(sql, (err,result)=>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error: error})
        }
    })
})


router.delete('/divisi/:divisi_id',(req,res)=>{
    let sql = `UPDATE divisi SET is_deleted = 1 WHERE id = '${req.params.divisi_id}'`
    conn.query(sql, (err,result)=>{
        try {
            if(err) throw err
            res.send('Berhasil di hapus')
        } catch (error) {
            res.send({error:error.message})
        }
    })
})

module.exports = router