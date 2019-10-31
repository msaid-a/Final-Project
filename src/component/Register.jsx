import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
    
    state={
        jabatan : ''
    }

    onRegiter = () =>{
        let nik = parseInt(this.nik.value)
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let nama = this.nama.value
        let gender = this.gender.value
        let agama = this.agama.value
        let pendidikan = this.pendidikan.value
        let jabatan = this.jabatan.value
        let pekerjaan = this.pekerjaan.value
        
        axios.post('http://localhost:2020/karyawan/',{
            nik,username,email,password,nama,gender,agama,pendidikan,jabatan,pekerjaan
        }).then(res=> {
            axios.post('http://localhost:2020/history',{
                user: "admin",
                desc: "telah menambahkan karyawan baru dengan username " + username,
                date: new Date() 
            }).then(res=>{
                alert('Success')
            })
        })
        
    }
    
    onPekerjaan = () =>{
        if(!this.state.jabatan){
            return (
            <select> <option value='' Hidden>Pekerjaan</option> </select>
            )}
        if(this.state.jabatan == "Karyawan Aplikasi"){
            return(
                <select ref ={input => this.pekerjaan = input}>
                    <option hidden>Pekerjaan</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Front End Developer">Front End Developer</option>
                    <option value="Back End Developer">Back End Developer</option>
                </select>
                
            )
        }
        if(this.state.jabatan == "Karyawan Marketing"){
            return (
            <select ref ={input => this.pekerjaan = input}>
                    <option hidden>Pekerjaan</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Sales">Sales</option>
                </select>
            )
        }

        if(this.state.jabatan.includes('Manager')){
            return (
            <select ref ={input => this.pekerjaan = input}>
                    <option value="Digital Marketing">Manager</option>
                </select>
            )
        }
        
    }




    
    render() {
        return (
        
           <div className="container col-8 text-left mb-5">
               <div className="card card-register mx-auto" style={{marginTop:100}}>
                   <div className="card-header">Register an Account</div>
                   <div className="card-body">
                       <form onSubmit={e => e.preventDefault()} className="mb-5">
                           <div className="form-group">
                               <label htmlFor="inputEmail">NIK</label>
                               <div className="form-label-group">
                                   <input type="number"  className="form-control" placeholder="NIK"
                                       required="required" ref={input => {this.nik = input}} />
                               </div>
                           </div>
                           <div className="form-group">
                               <label htmlFor="inputEmail">Username</label>
                               <div className="form-label-group">
                                   <input type="text"  className="form-control" placeholder="Username"
                                       required="required" ref={input => this.username = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputEmail">Email address</label>
                               <div className="form-label-group">
                                   <input type="email"  className="form-control"
                                       placeholder="Email address" required="required" ref={input => this.email= input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputEmail">Password</label>
                               <div className="form-label-group">
                                   <input type="Password"  className="form-control"
                                       placeholder="Password" required="required" ref ={input => this.password = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Nama</label>
                               <div className="form-label-group">
                                   <input type="text" className="form-control" placeholder="Nama"
                                       required="required" ref={input => this.nama = input}/>
                               </div>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">Jenis Kelamin</label>
                               <select name="" id="" ref={input => this.gender = input}>
                                   <option value="Laki-Laki">Laki</option>
                                   <option value="Perempuan">Perempuan</option>
                               </select>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Agama</label>
                               <div className="form-label-group">
                               <select name="" id="" ref={input => this.agama = input}>
                                   <option value="Islam">Islam</option>
                                   <option value="Kristen">Kristen</option>
                                   <option value="Hindu">Hindu</option>
                                   <option value="Budha">budha</option>
                                   <option value="Konghuchu">Konghuchu</option>
                               </select>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Pendidikan Terakhir</label>
                               <div className="form-label-group">
                                   <input type="text" className="form-control"
                                       placeholder="Pendidikan" required="required" ref={input => this.pendidikan = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Jabatan</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.jabatan = input} onChange={() => this.setState({jabatan:this.jabatan.value})}>
                                        <option value="" Hiden>Jabatan</option>
                                        <option value="Manager Aplikasi">Manager Aplikasi</option>
                                        <option value="Manager Marketing">Manager Marketing</option>
                                        <option value="Karyawan Aplikasi">Karyawan Aplikasi</option>
                                        <option value="Karyawan Marketing">Karyawan Marketing</option>
                                    </select>
                               </div>
                           </div>
                           <div className="form">
                               {this.onPekerjaan()}
                               {/* <label htmlFor="inputPassword">Pekerjaan</label>
                               <div className="form-label-group">
                                   <input type="text" className="form-control" placeholder="Pkerjaan"
                                       required="required" ref ={input => this.pekerjaan = input}/>
                               </div> */}
                           </div>
                           <button className="btn btn-primary btn-block mt-3" onClick={this.onRegiter}>Register</button>
                       </form>
                   </div>
               </div>
           </div>

        )
    }
}

export default Register
