const conn = require('../connection/index')
const router = require('express').Router()
const validator = require('validator')
const bcrypt = require('bcrypt')
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
    let sql = `select k.id, k.nik, s.username, s.email, s.password , 
	k.nama, k.gender, k.tanggal_lahir, k.agama, k.pendidikan, d.divisi, sd.subDivisi, k.jabatan,  k.phone
  from karyawan k
    join divisi d
    on k.divisi_id = d.id
    join users s 
    on k.id_user = s.id
    join subDivisi sd
    on k.subdivisi_id = sd.id WHERE k.is_deleted = 0
`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send(result)
    })
})

// Create 
router.post ('/karyawan',(req,res)=>{
    let id_users = token.generate(20)
    let id_karyawan = token.generate(20)
    let defaultAvatar = 'default_avatar.png'
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let sql = `INSERT INTO karyawan
    (id, id_user, nik,nama, gender, tanggal_lahir, agama, pendidikan, divisi_id,subdivisi_id ,jabatan,  phone, avatar) VALUES 
    ('${id_karyawan}',
        '${id_users}',
        '${req.body.nik}',
        '${req.body.nama}',
        '${req.body.gender}',
        '${req.body.tanggal_lahir}', 
        '${req.body.agama}', 
        '${req.body.pendidikan}', 
        '${req.body.divisi_id}',
        '${req.body.subdivisi_id}', 
        '${req.body.jabatan}', 
        '${req.body.phone}', 
        '${defaultAvatar}')`
    
    let sql2 = `INSERT INTO users (id, username, email, password) VALUES ('${id_users}', '${req.body.username}', '${req.body.email}', '${req.body.password}')`
    
    if(!validator.isEmail(req.body.email)){
        return res.send({error:'is not email'})
    }
    conn.query(sql2,  (err,result) =>{
        if(err) throw res.send({error:err.message})
        console.log('tambah data')
        conn.query(sql,  (err,result) =>{
            if(err) console.log(err)
            res.send('Success Nambah')
            console.log('tambah data')

        })
    })

})



// Get profile Karyawan
router.get('/karyawan/profile/:userid',(req,res)=>{
    let sql = `select *
  from karyawan k
    join divisi d
    on k.divisi_id = d.id
    join users s 
    on k.id_user = s.id
    join subDivisi sd
    on k.subdivisi_id = sd.id
    WHERE k.id='${req.params.userid}'`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        res.send({
            ...result[0],
            avatar: `http://localhost:2222/avatar/${result[0].avatar}`
        })
    })
})

// login
router.post('/login',(req,res)=>{
    let {email,username,password} =req.body
    let sql = `SELECT users.id, users.username, users.password, karyawan.jabatan, divisi.divisi FROM users 
                join karyawan 
                on karyawan.id_user = users.id
                join divisi
                on karyawan.divisi_id = divisi.id WHERE email ='${email}'`
    if(!email) sql = `SELECT users.id, users.username, users.password, karyawan.jabatan, divisi.divisi FROM users 
                        join karyawan 
                        on karyawan.id_user = users.id
                        join divisi
                        on karyawan.divisi_id = divisi.id  WHERE username='${username}'`

    conn.query(sql, async (err,result)=>{
        if(err) return res.send({error:err.message})
        if(result.length === 0 ) return res.send({error:'User Not Found'})

        let user = result[0]
        let hash =  await bcrypt.compare(password, user.password)
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

// delete
router.delete('/karyawan/delete/:nik',(req,res)=>{
    let sql = `UPDATE karyawan SET is_deleted = 1 WHERE nik = '${req.params.nik}'`
    conn.query(sql, (err, result)=>{
        try {
            if(err) throw err
            res.send('Berhasil di delete')
        } catch (error) {
            res.send({error: error.message})
        }
    })
})

module.exports = router