const conn = require('../connection/index')
const router = require('express').Router()
const token = require('rand-token')

// get all
router.get('/gaji',(req,res)=>{
    let sql =`SELECT g.id, k.nama, k.nik, g.bulan, g.tahun, g.gaji, g.tunjanganKeluarga, g.tunjanganTransportasi, g.bonus FROM gaji g
                join karyawan k
                on k.id = g.user_id Order By g.tahun Desc`
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

// get own gaji
router.get('/gaji/profile/:userid',(req,res)=>{
    let sql =`SELECT g.id, k.nama, k.nik,g.bulan, g.tahun, g.gaji, g.tunjanganKeluarga, g.tunjanganTransportasi, g.bonus FROM gaji g
                join karyawan k
                on k.id = g.user_id
                WHERE k.id_user ='${req.params.userid}'`
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

// get one gaji
router.get('/gaji/:userid',(req,res)=>{
    let sql =`SELECT g.id, k.nama, k.nik,g.bulan, g.tahun, g.gaji, g.tunjanganKeluarga, g.tunjanganTransportasi, g.bonus FROM gaji g
                join karyawan k
                on k.id = g.user_id
                WHERE g.id ='${req.params.userid}'`
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

// post gaji
router.post('/gaji',(req,res)=>{
    let sql = `INSERT INTO gaji SET ?`
    let data = req.body
    data.id = token.generate(20)
    conn.query(sql,data,(err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send('Success Added Gaji')
    })
})

module.exports = router