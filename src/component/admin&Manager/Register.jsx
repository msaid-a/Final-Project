import React, { Component } from 'react'
import axios from '../../config/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

class Register extends Component {
    
    state={
        selectDivisi : '',
        jabatan: '',
        divisi : [],
        subdivisi:[]
    }

    onRegiter = () =>{
        let nik = parseInt(this.nik.value)
        if(isNaN(parseInt(this.nik.value))){
            return  Swal.fire({
                type: 'error',
                title: 'NIK Harus berupa Angka',
                showConfirmButton:false,
                timer:900
            })       
        }
        let username = this.username.value.toLowerCase()
        let email = this.email.value
        let password = this.password.value
        let nama = this.nama.value
        let gender = this.gender.value
        let agama = this.agama.value
        let pendidikan = this.pendidikan.value
        let divisi_id = this.divisi.value
        let jabatan = this.jabatan.value
        let subdivisi_id = this.subDivisi.value
        let phone = this.phone.value
        let tanggal_lahir = new Date(this.tanggal_lahir.value)
            tanggal_lahir =moment(tanggal_lahir).format('YYYY-MM-DD HH-mm-ss')

      
        axios.post('/karyawan/',{
            nik,username,email,password,nama,gender,agama,tanggal_lahir,pendidikan,divisi_id,jabatan,subdivisi_id,phone
        }).then(res=> {

            if(res.data.error){
                if(res.data.error.includes("UNIQUE")){
                    return  Swal.fire({
                        type: 'error',
                        title: 'username/email Telah di gunakan',
                        showConfirmButton:false,
                        timer:900
                    })       
                }
                    return Swal.fire({
                        type: 'error',
                        title: 'Isi Semua From',
                        showConfirmButton:false,
                        timer:900
                    })   
            }

            axios.post('/history',{
                description: "telah menambahkan karyawan baru dengan username " + username,
                user_id:this.props.iD,
                divisi : this.props.divisi,
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            }).then(res=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    showConfirmButton:false,
                    timer:900
                })                
                this.nik.value = null
                this.username.value= null
                this.email.value = null
                this.password.value = null
                this.nama.value = null
                this.gender.value = null
                this.agama.value = null
                this.pendidikan.value = null
                this.divisi.value = null
                this.jabatan.value = null
                this.subDivisi.value = null
                this.phone.value = null
                this.tanggal_lahir.value = null
            })
        })
        
    }
    getDivisi = () =>{
        axios.get('/divisi')
            .then(res=>{
                this.setState({divisi: res.data})
            })
        axios.get('/subdivisi')
            .then(res=>{
                this.setState({subdivisi:res.data})
            })
    }

    componentDidMount = () =>{
        this.getDivisi()
      
    }
    
    renderDivisi = () =>{
        return this.state.divisi.map(data => {
            return(<option value={data.id}>{data.divisi}</option>)
        })
    }

    renderSubDivisi = () =>{
       
        if(this.state.jabatan =="Manager"){
            let subdivisi = this.state.subdivisi.filter(data=>{
                return data.subDivisi.includes('Manager') && data.divisi_id.includes(this.state.selectDivisi)
            })
            return subdivisi.map (data => {
                return <option value={data.id}>{data.subDivisi}</option>
            })
        }else{
            let subdivisi = this.state.subdivisi.filter(data=>{
                return data.divisi_id.includes(this.state.selectDivisi) && data.subDivisi.includes('Manager') == false
            })
            return subdivisi.map (data => {
                return <option value={data.id}>{data.subDivisi}</option>
            })
        }

    }

    




    
    render() {
        if(!bcrypt.compareSync("admin", this.props.jabatan)){
            return <Redirect to ="/" ></Redirect>
        }
        return (
        
           <div className="container col-8 text-left mb-5">
               <div className="card card-register mx-auto" style={{marginTop:100}}>
                   <div className="card-header">Register an Account</div>
                   <div className="card-body">
                       <form onSubmit={e => e.preventDefault()} className="mb-5">
                           <div className="form-group">
                               <label htmlFor="inputEmail">NIK</label>
                               <div className="form-label-group">
                                   <input type="text"  className="form-control" placeholder="NIK"
                                        maxlength="16" ref={input => {this.nik = input}} />
                               </div>
                           </div>
                           <div className="form-group">
                               <label htmlFor="inputEmail">Username</label>
                               <div className="form-label-group">
                                   <input type="text"  className="form-control" placeholder="Username"
                                       maxlength="20" ref={input => this.username = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputEmail">Email address</label>
                               <div className="form-label-group">
                                   <input type="email"  className="form-control"
                                       placeholder="Email address"  ref={input => this.email= input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputEmail">Password</label>
                               <div className="form-label-group">
                                   <input type="Password"  className="form-control"
                                       placeholder="Password"  ref ={input => this.password = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Nama</label>
                               <div className="form-label-group">
                                   <input type="text" className="form-control" placeholder="Nama"
                                        ref={input => this.nama = input}/>
                               </div>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">Jenis Kelamin</label>
                               <select name="" id="" ref={input => this.gender = input}>
                                   <option value="Pria">Pria</option>
                                   <option value="Wanita">Wanita</option>
                               </select>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">Tanggal Lahir</label>
                               <input type="date" ref={input => this.tanggal_lahir = input}/>
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
                                   <select type="text" className="form-control"
                                      ref={input => this.pendidikan = input}>
                                         <option value="SMA/SMK">SMA/SMK</option>
                                         <option value="S1">S1</option>
                                         <option value="S2">S2</option>
                                         <option value="S3">S3</option>
                                     </select>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Divisi</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.divisi = input} onChange={()=>this.setState({selectDivisi : this.divisi.value})}>
                                    <option value='' hidden>Divisi</option>
                                        {this.renderDivisi()}
                                    </select>
                               </div>
                           </div>  

                           <div className="form">
                               <label htmlFor="inputPassword">Jabatan</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.jabatan = input} onChange={() => this.setState({jabatan:this.jabatan.value})}>
                                        <option value="" hidden>Jabatan</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Karyawan">Karyawan</option>
                                    </select>
                               </div>
</div>
                          
                            <div className="form">
                               <label htmlFor="inputPassword">Pekerjaan</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.subDivisi = input} >
                                        <option value='' hidden>Pekerjaan</option>
                                        {this.renderSubDivisi()}
                                    </select>
                               </div>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">No HP</label>
                               <input type="number" ref={input => this.phone = input}/>
                           </div>
                         
                           <button className="btn btn-primary btn-block mt-3" onClick={this.onRegiter}>Register</button>
                       </form>
                   </div>
               </div>
           </div>

        )
    }
}
const mapStateToProps = (state) =>{
    return {
        userName : state.auth.username,
        iD : state.auth.id,
        jabatan : state.auth.jabatan,
        divisi: state.auth.divisi
    }
  }
export default connect(mapStateToProps,{})(Register)
