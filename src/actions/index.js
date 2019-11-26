// ACTION CREATORS 
import axios from '../config/index'
import Swal from 'sweetalert2'
const bcrypt = require('bcryptjs');

export const sendData = (_username, _password) =>{
   return (dispatch) => {
       if(_username.includes('@')){
           axios.post(
               '/login', 
               {
                   email : _username,
                   password : _password 
               }
           ).then((res) => {
               if(res.data.error){
                 return  Swal.fire({
                       type: 'error',
                       title: 'Sorry',
                       text: 'Username atau Password Salah!',
                       showConfirmButton:false,
                       timer:900
                   })
               }else{
                   let {id, username, jabatan, divisi,token} = res.data
                   jabatan =  bcrypt.hashSync(jabatan, 8)
                   // kirim id dan username ke reducers
                       localStorage.setItem('userData',JSON.stringify({id, username, jabatan,divisi, token}))
                       // Action
                       dispatch( {
                           type : "LOGIN_SUCCESS",
                           payload : {
                               id, 
                               username,
                               jabatan ,
                               divisi,
                               token 
                           }
                       }
                       )
                   
               }
           })
       }else{
        axios.post(
            '/login', 
            {
                   username : _username,
                   password : _password 
            }
        ).then((res) => {
            if(res.data.error){
                Swal.fire({
                    type: 'error',
                    title: 'Sorry',
                    text: 'Username atau Password Salah!',
                    showConfirmButton:false,
                    timer:900
                })
            }else{
                let {id, username, jabatan, divisi,token} = res.data
                // kirim id dan username ke reducers
                jabatan =  bcrypt.hashSync(jabatan, 8)
                    localStorage.setItem('userData',JSON.stringify({id, username, jabatan,divisi,token}))
                    // Action
                    dispatch( {
                        type : "LOGIN_SUCCESS",
                        payload : {
                            id, 
                            username,
                            jabatan,
                            divisi,
                            token 
                        }
                    }
                    )
                
            }
        }).catch(err =>{
            console.log(err)
        })
       }

   }
    
}

export const logoutData = (_id, _username) =>{
    // Action

    // hapus data di local storage
    localStorage.removeItem('userData')
    // hapus data di redux
    return {
        type : "LOGOUT_SUCCESS",
    }
}

export const session = (userData) =>{
    return {
        type : 'LOGIN_SUCCESS',
        payload:{
            id : userData.id,
            username: userData.username,
            jabatan : userData.jabatan,
            divisi : userData.divisi,
            token : userData.token
        }
    }
}
