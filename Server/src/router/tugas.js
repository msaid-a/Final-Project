const conn= require('../connection/index')
const router = require('express').Router()
const token = require('rand-token')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const tugasDirectory = path.join(__dirname, '../../public/tugas/')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,tugasDirectory)
    },
    filename : function(req,file,cb){
        cb(null, `${Date.now()}-${req.params.tugasid}-${file.fieldname}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage : storage,
    limits :{
        fileSize : 200000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(zip|rar|pdf|docx|xlxs|pptx)$/)){
            cb(new Error ('Format file harus zip/rar/docx/xlxs/pptx'))
        }
        cb(null,true)    
    }
})




// upload tugas 
router.post('/tugas/uploads/:tugasid',(upload.single('hasil')),(req,res)=>{
    let sql = `UPDATE tugas SET hasil ='${req.file.filename}', status='${req.body.status}' WHERE id = '${req.params.tugasid}'`
    conn.query(sql,(err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send('success Upload')
    })
})



// post tugas
router.post('/tugas/:userid',(req,res)=>{
    let sql = `INSERT INTO tugas SET ?`
    let data = req.body

    data.id = token.generate(20)
    if(!data.hasil){
        data.status = 'Belum di kumpulkan'
    }

    conn.query(sql,data,(err, result)=>{
        if(err) return res.send({error:err.sqlmessage})
        res.send('success')
    })

})

// read tugas
router.get('/tugas/divisi/:divisi',(req,res)=>{
    let sql = `SELECT t.id, k.nama, t.title, t.description, t.deadline, t.pengirim, t.hasil, t.status FROM tugas t
	join karyawan k
    on k.id = t.user_id JOIN divisi d on k.divisi_id = d.id WHERE d.divisi = '${req.params.divisi}'
    order by t.created_at desc`

    conn.query(sql, (err,result)=>{
        if(err) return res.send({error : err.sqlmessage})
        let data = result
        data.map(tugas =>{          
            tugas.hasil = `http://localhost:2020/download/${tugas.hasil}`
        })
        res.send(result)
    })
})

// read all tugas
router.get('/tugas',(req,res)=>{
    let sql = `SELECT t.id, k.nama, t.title, t.description, t.deadline, t.pengirim, t.hasil, t.status, t.terlambat FROM tugas t
	join karyawan k
    on k.id = t.user_id JOIN divisi d on k.divisi_id = d.id
    order by t.created_at desc`

    let sql2 = `UPDATE tugas SET ? WHERE status = 'Belum di kumpulkan' or status = 'REVISI' or terlambat = 0`

    conn.query(sql, (err,result)=>{
        if(err) return res.send({error : err.sqlmessage})
        let data = result
        let now = new Date()
        data.map(tugas =>{  
            let deadline = new Date(tugas.deadline)        
            if(now >= deadline && (tugas.status.toLowerCase().includes('belum') || tugas.status =='REVISI')){
            let telat = {
                status : 'Terlambat',
                terlambat : 1
            }
                conn.query(sql2, telat, (err, result)=>{
                    if(err) return res.send({error: err.message})
                })
            }
        })
        res.send(result)
    })
})





// Read tugas with user id 
router.get('/tugas/:userid',(req,res)=>{
    let sql = `SELECT t.id, k.nama, k.id as user_id, k.id_user, t.user_id, t.title, t.description, t.deadline, t.pengirim, t.hasil, t.status FROM tugas t
	join karyawan k
    on k.id = t.user_id
    WHERE k.id_user = '${req.params.userid}'
    ORDER BY t.deadline DESC`

    conn.query(sql, (err,result)=>{
        if(err) return res.send({error : err.sqlmessage})
        res.send(result)
    })
})


// // Download Tugas
// router.get('/download/:filename',(req,res)=>{
//     let directory = {
//         root : tugasDirectory
//     }
//     let fileName = req.params.filename
//     res.sendFile(fileName, directory, function(err){
//         if(err) return res.send({error:err.sqlmessage})
//     })
// })

// update tugas
router.patch('/tugas/:tugasid', (req,res)=>{
    let sql = `UPDATE tugas SET ? WHERE id ='${req.params.tugasid}'`
    let data = [req.body, req.params.tugasid]

    conn.query(sql,data, (err,result)=>{
        if(err) return res.send({error:err.sqlmessage})
            res.send(result)
    })
})

module.exports = router




