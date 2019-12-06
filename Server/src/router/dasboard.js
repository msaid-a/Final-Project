const conn = require('../connection/index')
const router = require('express').Router()
const express = require('express')

router.get('/ratetugas', (req,res)=>{
    const sql = `select d.divisi, count(t.title) as hasil from divisi d 
	join karyawan k 
	on d.id = k.divisi_id
	join tugas t
		on k.id = t.user_id
    group by d.divisi`
    
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error : err.message})
        res.send(result)
    })
})
// tugas berdasarakan divisi
router.get('/ratetugas/:divisi',(req,res)=>{
    const sql = `select k.nama, count(t.title) as hasil from divisi d 
	join karyawan k 
	on d.id = k.divisi_id
	join tugas t
		on k.id = t.user_id
        where d.divisi = '${req.params.divisi}'
    group by k.nama`
    conn.query(sql, (err, result)=>{
        if(err) return res.send({error : err.message})
        res.send(result)
    })
})

router.get('/ratagaji',(req,res)=>{
    const sql = `select d.divisi, round(avg(g.gaji)) as rata_rata from gaji g
    join karyawan k 
    on k.id = g.user_id
    join divisi d 
    on k.divisi_id = d.id
    group by d.divisi`
    conn.query(sql, (err, result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})


router.get('/gajipekerjaan',(req,res)=>{
    const sql = `select s.subDivisi, round(avg(g.gaji)) as rata_rata from gaji g
    join karyawan k 
    on k.id = g.user_id
    join divisi d 
    on k.divisi_id = d.id
    join subDivisi s 
    on d.id = s.divisi_id
    group by s.subDivisi`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})


// 5 Karyawan paling banyak terlambat bulan ini
router.get('/terlambatbulan',(req,res)=>{
    const sql = `select k.nama,  count(t.title) as terlambat from tugas t
    join karyawan k
    on k.id = t.user_id
    where month(created_at) = month(curdate()) and t.terlambat = 1
    group by k.nama
    limit 5`
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error: err.message})
        res.send(result)
    })
})

router.get('/terlambatbulan/:divisi',(req,res)=>{
    const sql = `select k.nama, count(t.title) as terlambat, d.divisi from tugas t
    join karyawan k
    on k.id = t.user_id
    join divisi d
    on k.divisi_id = d.id
    where month(created_at) = month(curdate()) and t.terlambat = 1 and divisi ='${req.params.divisi}'
    group by k.nama, d.divisi
    limit 5`

    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})


module.exports = router