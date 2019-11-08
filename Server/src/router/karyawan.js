const conn = require('../connection/index')
const router = require('express').Router()
const validator = require('validator')
const bcrypt = require('bcryptjs')
const token = require('rand-token')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const avatarDirectory = path.join(__dirname, '../../public/avatar/')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,avatarDirectory)
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${req.params.userid}-${file.fieldname}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 2000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)){
            cb(new Error ('Format file harus jpg/jpeg/png'))
        }
        cb(null,true)    
    }
})

// post avatar
router.post('/avatar/:userid',(req,res,next)=>{
    const sql = `SELECT * FROM karyawan WHERE id='${req.params.userid}' `
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.message})
        if(!result[0]) return res.send({err:'user not found'})
        next()
    })
},upload.single('avatar'), (req,res)=>{
    const sql = `UPDATE karyawan SET avatar = '${req.file.filename}' WHERE id ='${req.params.userid}'`
    const sql2=`SELECT avatar FROM karyawan WHERE id='${req.params.userid}'`

    conn.query(sql2, (err,result)=>{
        if(err) return res.send({error:err.message})
        if(result[0].avatar !== 'default-avatar.png'){
            fs.unlink(avatarDirectory+result[0].avatar)
        }

        conn.query(sql,(err,result)=>{
            if(err) return res.send({error:err.message})
            res.send({filename:req.file.filename})
        })
    })
})

// read avatar
router.get('/avatar/:filename',(req,res)=>{
    let directory = {
        root : avatarDirectory
    }
    let fileName = req.params.filename
    res.sendFile(fileName, directory, function(err){
        if(err) return res.send({error:err.message})
    })
})



// Get all Karyawan
router.get('/karyawan',(req,res)=>{
    let sql = `SELECT * FROM karyawan`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})

// Create 
router.post ('/karyawan',(req,res)=>{
    let sql = `INSERT INTO karyawan SET ?`
    let data = req.body
    data.avatar = 'default-avatar.png'
    
    if(!validator.isEmail(data.email)){
        return res.send({error:'is not email'})
    }
    data.id = token.generate(20)
    data.password = bcrypt.hashSync(data.password, 8)

    conn.query(sql, data, (err,result) =>{
        if(err) return res.send({error:err.message})
        res.send('Success Nambah')
    })

})



// Get profile Karyawan
router.get('/karyawan/profile/:userid',(req,res)=>{
    let sql = `SELECT * FROM karyawan WHERE id='${req.params.userid}'`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send({
            ...result[0],
            avatar: `http://localhost:2222/avatar/${result[0].avatar}`
        })
    })
})

// login
router.post('/karyawan/login',(req,res)=>{
    let {email,username,passwod} =req.body
    let sql = `SELECT * FROM karyawan WHERE email ='${email}'`
    if(!email) sql = `SELECT * FROM karyawan WHERE username='${username}'`

    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        if(result.length === 0 ) return res.send({error:'User Not Found'})

        let hash =  bcrypt.compare(passwod, result[0].password)
        if(!hash) return res.send({error:'Wrong password'})
        res.send(result[0])
    })
})


// update
router.patch('/karyawan/:userid', (req,res)=>{
    let sql = `UPDATE karyawan SET ? WHERE id ='${req.params.userid}'`
    let data = [req.body, req.params.userid]
    
    if(data[0].password === '') delete data[0].password
    if(data[0].password) data[0].password = bcrypt.hashSync(data[0].password, 8)

    conn.query(sql,data, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})

module.exports = router