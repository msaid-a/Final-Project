const conn = require('../connection/index')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const avatarDirectory = path.join(__dirname, '../../public/avatar/')
const tugasDirectory = path.join(__dirname, '../../public/tugas/')


// login
router.post('/login',(req,res)=>{
    let {email,username,password} =req.body
    let sql = `SELECT users.id, users.username, users.password, users.is_deleted, karyawan.jabatan, divisi.divisi FROM users 
                join karyawan 
                on karyawan.id_user = users.id
                join divisi
                on karyawan.divisi_id = divisi.id WHERE users.email ='${email}' and users.is_deleted = 0`
    if(!email) sql = `SELECT users.id, users.username, users.password,users.is_deleted, karyawan.jabatan, divisi.divisi FROM users 
                        join karyawan 
                        on karyawan.id_user = users.id
                        join divisi
                        on karyawan.divisi_id = divisi.id  WHERE users.username='${username}' and users.is_deleted = 0`

    conn.query(sql, async (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        if(result.length === 0 ) return res.send({error:'User Not Found'})

        let user = result[0]
        let hash =  await bcrypt.compare(password, user.password)
        if(!hash) return res.send({error:'Wrong password'})
        let token = jwt.sign({ id: user.id, username: user.username }, 'hjlkdsahjsahdkjahdslkj', { expiresIn: 129600 }); // Sigining the token
        res.send({...result[0],
                    token })
    })
})

// read avatar
router.get('/avatar/:filename',(req,res)=>{
    let directory = {
        root : avatarDirectory
    }
    let fileName = req.params.filename
    res.sendFile(fileName, directory, function(err){
        if(err) return res.send({error:err.sqlmessage})
    })
})

// Download Tugas
router.get('/download/:filename',(req,res)=>{
    let directory = {
        root : tugasDirectory
    }
    let fileName = req.params.filename
    res.sendFile(fileName, directory, function(err){
        if(err) return res.send({error:err.sqlmessage})
    })
})

module.exports = router