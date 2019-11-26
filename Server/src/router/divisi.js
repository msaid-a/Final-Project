const conn = require('../connection/index')
const router = require('express').Router()
const express = require('express')
const app = express()
const token = require('rand-token')
const jwt = require('jsonwebtoken')


router.post('/divisi',(req, res)=>{
    
    let sql = `INSERT INTO divisi SET ?`
    let data = req.body
        data.id = token.generate(20)
    conn.query(sql, data, (err, result)=>{
        try {
            if(err) throw err
            let id = token.generate(20)
            let subDivisi = 'Manager ' + req.body.divisi
            let divisi_id = data.id
            let sql2 = `INSERT INTO subDivisi (id, subDivisi, divisi_id) VALUES ('${id}', '${subDivisi}', '${divisi_id}')`
            conn.query(sql2, (err, result)=>{
                if(err) return res.send({error:err.sqlmessage})
                res.send('Berhasil Menambahkan')
            })
        } catch (error) {
            res.send({error: error})
        }
    })
})

router.get('/divisi',(req,res)=>{
   
    let sql = `SELECT * FROM divisi WHERE is_deleted = 0 ORDER BY divisi`
    conn.query(sql, (err,result)=>{
            if(err) return console.log (err)
            res.send(result)
    })
})

router.post('/subdivisi',(req, res)=>{
    let sql = `INSERT INTO subDivisi SET ?`
    let data = req.body
        data.id = token.generate(20)
    conn.query(sql, data, (err, result)=>{
            if(err) return res.send({error:err.sqlMessage})
            res.send('Berhasil Menambahkan')
      
    })
})

router.get('/subdivisi',(req,res)=>{
    let sql = `SELECT s.id, s.subDivisi,d.divisi, s.divisi_id FROM subDivisi s join divisi d on d.id = s.divisi_id WHERE d.is_deleted=0`
    conn.query(sql, (err,result)=>{
        try {
            if(err) throw err
            res.send(result)
        } catch (error) {
            res.send({error: error.sqlmessage})
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
            res.send({error:error.sqlmessage})
        }
    })
})

module.exports = router