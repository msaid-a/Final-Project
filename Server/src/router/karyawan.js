const conn = require('../connection/index')
const router = require('express').Router()
const validator = require('validator')
const bcrypt = require('bcrypt')
const token = require('rand-token')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt')

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
        if(err) return res.send({error:err.sqlmessage})
        // res.send(result[0])
        if(result[0].avatar !== 'default_avatar.png'){
            fs.unlinkSync(avatarDirectory+result[0].avatar, (err) => {return res.send(err)})
        }
        
        conn.query(sql,(err,result)=>{
            if(err) return res.send({error:err.sqlmessage})
            res.send('Success')
        })
    })
})

// read avatar
// router.get('/avatar/:filename',(req,res)=>{
//     let directory = {
//         root : avatarDirectory
//     }
//     let fileName = req.params.filename
//     res.sendFile(fileName, directory, function(err){
//         if(err) return res.send({error:err.sqlmessage})
//     })
// })



// Get all Karyawan
router.get('/karyawan',(req,res)=>{
    let sql = `select k.id, k.id_user,k.nik, s.username, s.email, s.password , 
	k.nama, k.gender, k.tanggal_lahir, k.agama, k.pendidikan, d.divisi, sd.subDivisi, k.jabatan,  k.phone, k.avatar
  from karyawan k
    join divisi d
    on k.divisi_id = d.id
    join users s 
    on k.id_user = s.id
    join subDivisi sd
    on k.subdivisi_id = sd.id WHERE k.is_deleted = 0
    ORDER BY k.jabatan
`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

// Total Karyawan
router.get('/karyawan/total',(req,res)=>{
    let sql = `select  d.divisi, sd.subDivisi, COUNT(k.id) as jumlah_karyawan
    from karyawan k
join divisi d
on k.divisi_id = d.id
join users s 
on k.id_user = s.id
join subDivisi sd
on k.subdivisi_id = sd.id WHERE k.is_deleted = 0
GROUP BY d.divisi, sd.subdivisi
`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

router.get('/karyawan/total/:divisi',(req,res)=>{
    let sql = `select  d.divisi, sd.subDivisi, COUNT(k.id) as jumlah_karyawan
    from karyawan k
join divisi d
on k.divisi_id = d.id
join users s 
on k.id_user = s.id
join subDivisi sd
on k.subdivisi_id = sd.id WHERE k.is_deleted = 0 and d.divisi = '${req.params.divisi}'
GROUP BY d.divisi, sd.subdivisi
`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})

// Create 
router.post ('/karyawan',(req,res)=>{
    let id_users = token.generate(20)
    let id_karyawan = token.generate(20)
    let defaultAvatar = 'default_avatar.png'
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let data = {
        id : id_karyawan,
        id_user : id_users,
        nik: req.body.nik,
        nama : req.body.nama,
        gender : req.body.gender,
        tanggal_lahir : req.body.tanggal_lahir,
        agama : req.body.agama,
        pendidikan : req.body.pendidikan,
        divisi_id : req.body.divisi_id,
        subdivisi_id : req.body.subdivisi_id,
        jabatan : req.body.jabatan,
        phone : req.body.phone,
        avatar : defaultAvatar
    }

    let data2 = {
        id : id_users,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    let sql = `INSERT INTO karyawan set ?`
    
    let sql2 = `INSERT INTO users set ?`
    
    if(!validator.isEmail(req.body.email)){
        return res.send({error:'is not email'})
    }
    conn.beginTransaction((err)=>{
        if(err) return res.send({error : err.message})
        conn.query(sql2, data2, (err,result) =>{
            if(err){
                return conn.rollback(()=>{
                    res.send({error:err.message})
                })  
            } 
            conn.query(sql, data,  (err,result) =>{
                if(err){
                    return conn.rollback(()=>{
                        res.send ({error:err.message})
                    })

                } 
                conn.commit(err => {
                    if(err){
                        return conn.rollback(()=>{
                            res.send ({error:err.message})
                        })
    
                    } 
                })
                res.send('Success Nambah')
            })
        })
    })

})



// Get profile Karyawan
router.get('/karyawan/profile/:userid',(req,res)=>{
    let sql = `select k.id, k.id_user , k.nik, s.username, s.email, s.password , 
	k.nama, k.gender, k.tanggal_lahir, k.agama, k.pendidikan, d.divisi, sd.subDivisi, k.jabatan,  k.phone, k.avatar
  from karyawan k
    join divisi d
    on k.divisi_id = d.id
    join users s 
    on k.id_user = s.id
    join subDivisi sd
    on k.subdivisi_id = sd.id WHERE k.is_deleted = 0 and k.id_user='${req.params.userid}'`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.message})
        if(result.length === 0){
            return res.send({error:'User Not Found'})
        }
        res.send({
            ...result[0],
            avatar: `http://localhost:2020/avatar/${result[0].avatar}`
        })
    })
})

// Get karyawan berdasarkan divisi
router.get('/karyawan/divisi/:divisi',(req,res)=>{
    let sql = `select k.id,k.id_user , k.nik, s.username, s.email, s.password , 
	k.nama, k.gender, k.tanggal_lahir, k.agama, k.pendidikan, d.divisi, sd.subDivisi, k.jabatan,  k.phone, k.avatar
  from karyawan k
    join divisi d
    on k.divisi_id = d.id
    join users s 
    on k.id_user = s.id
    join subDivisi sd
    on k.subdivisi_id = sd.id WHERE k.is_deleted = 0 and k.jabatan='Karyawan' and d.divisi ='${req.params.divisi}'`
    conn.query(sql, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send(result)
    })
})




// update
router.patch('/karyawan/:userid', (req,res)=>{
    let sql = `UPDATE karyawan INNER JOIN users on karyawan.id_user = users.id SET ? WHERE users.id ='${req.params.userid}'`
    let data = req.body
    
    if(data.password === '') delete data.password
    if(data.password) data.password = bcrypt.hashSync(data.password, 8)

    conn.query(sql,data, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        
        // conn.query(sql2,data, (err,result)=>{
        //     if(err) return res.send({error:err.sqlmessage})
            res.send(result)
        // })
    })
})

// delete
router.delete('/karyawan/delete/:id_user',(req,res)=>{
    let sql = `UPDATE karyawan SET is_deleted = 1 WHERE id_user = '${req.params.id_user}'`
    let sql2 = `UPDATE users SET is_deleted = 1 WHERE id = '${req.params.id_user}'`
    conn.query(sql, (err, result)=>{
        try {
            if(err) throw err
            conn.query(sql2, (err,result)=>{
                if(err) throw err
                res.send('Berhasil di delete')
            })
        } catch (error) {
            res.send({error: error.message})
        }
    })
})

module.exports = router

// let id_users = token.generate(20)
//     let id_karyawan = token.generate(20)
//     let defaultAvatar = 'default_avatar.png'
//     req.body.password = bcrypt.hashSync(req.body.password, 8)
//     let sql = `INSERT INTO karyawan
//     (id, id_user, nik,nama, gender, tanggal_lahir, agama, pendidikan, divisi_id,subdivisi_id ,jabatan,  phone, avatar) VALUES 
//     ('${id_karyawan}',
//         '${id_users}',
//         '${req.body.nik}',
//         '${req.body.nama}',
//         '${req.body.gender}',
//         '${req.body.tanggal_lahir}', 
//         '${req.body.agama}', 
//         '${req.body.pendidikan}', 
//         '${req.body.divisi_id}',
//         '${req.body.subdivisi_id}', 
//         '${req.body.jabatan}', 
//         '${req.body.phone}', 
//         '${defaultAvatar}')`
    
//     let sql2 = `INSERT INTO users (id, username, email, password) VALUES ('${id_users}', '${req.body.username}', '${req.body.email}', '${req.body.password}')`
    
//     if(!validator.isEmail(req.body.email)){
//         return res.send({error:'is not email'})
//     }
//     conn.query(sql2,  (err,result) =>{
//         if(err) return res.send({error:err.sqlMessage})
//         conn.query(sql,  (err,result) =>{
//             if(err) return ({error:err.sqlmessage})
//             res.send('Success Nambah')
//         })
//     })