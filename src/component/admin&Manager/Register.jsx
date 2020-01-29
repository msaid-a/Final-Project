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
        subdivisi:[],
        error : false
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
        let divisi_id = !this.divisi ? this.divisi = '' : this.divisi.value  
        let jabatan = this.jabatan.value ? this.jabatan.value : this.jabatan.value = ''
        let subdivisi_id = !this.subDivisi ? this.subDivisi = '' : this.subDivisi.value
        let phone = this.phone.value ? parseInt(this.phone.value) : this.phone.value = 1
        
        let tanggal_lahir = new Date(this.tanggal_lahir.value)
            let limit = new Date('2004-12-31')
            if(tanggal_lahir >= limit){
                return alert('Invalid Date')
            }
            console.log(limit)
            tanggal_lahir =moment(tanggal_lahir).format('YYYY-MM-DD HH-mm-ss')

      
        axios.post('/karyawan/',{
            nik,username,email,password,nama,gender,agama,tanggal_lahir,pendidikan,divisi_id,jabatan,subdivisi_id,phone
        },{
            headers:{
            keys : this.props.token
        }}).then(res=> {
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
                type : "Input",
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            },{
                headers:{
                keys : this.props.token
            }}).then(res=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    showConfirmButton:false,
                    timer:900
                })
                this.nik.value = ''
                this.username.value= ''
                this.email.value = ''
                this.password.value = ''
                this.nama.value = ''
                this.phone.value = ''
                this.tanggal_lahir.value = ''
                // return <Redirect to ="/datakaryawan" ></Redirect>
            })
        })
        
    }
    getDivisi = () =>{
        axios.get('/divisi',{
            headers:{
            keys : this.props.token
        }})
            .then(res=>{
                    this.setState({divisi: res.data})
            })
        axios.get('/subdivisi',{
            headers:{
            keys : this.props.token
        }})
            .then(res=>{
                this.setState({subdivisi:res.data})
            })
    }

    componentDidMount = () =>{
        this.getDivisi()
      
    }
    
    renderDivisi = () =>{
        if(this.state.jabatan){
            let data3 = this.state.divisi.filter(val=>{
                return val.divisi !== 'admin'
            })
            return data3.map(data=>{
                return(<option value={data.id}>{data.divisi}</option>)
            })

        }else{
            return(<option value=''>Divisi</option>)
        }
    }

    renderSubDivisi = () =>{
    if(this.state.selectDivisi){
        if(this.state.jabatan ==="Manager"){
             let subdivisi = this.state.subdivisi.filter(data=>{
                 return data.subDivisi.includes('Manager') && data.divisi_id.includes(this.state.selectDivisi)
             })
             return subdivisi.map (data => {
                 return <option value={data.id}>{data.subDivisi}</option>
             })
         }else{
             let subdivisi = this.state.subdivisi.filter(data=>{
                 return data.divisi_id.includes(this.state.selectDivisi) && data.subDivisi.includes('Manager') === false
             })
             return subdivisi.map (data => {
                return <option value={data.id}>{data.subDivisi}</option>
             })
         }
    }else{
        return <option value=''>Pekerjaan</option>
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
                                       maxlength="10" ref={input => this.username = input}/>
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
                                      maxlength="30" placeholder="Password"  ref ={input => this.password = input}/>
                               </div>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Nama</label>
                               <div className="form-label-group">
                                   <input type="text" className="form-control" placeholder="Nama"
                                       maxlength="25" ref={input => this.nama = input}/>
                               </div>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">Jenis Kelamin</label>
                               <select className="custom-select" id="" ref={input => this.gender = input}>
                                   <option value="Pria">Pria</option>
                                   <option value="Wanita">Wanita</option>
                               </select>
                           </div>
                           <div className="form mt-3">
                               <label htmlFor="inputPassword">Tanggal Lahir</label>
                               <input type="date" ref={input => this.tanggal_lahir = input} max="2004-12-31"/>
                           </div>
                           <div className="form">
                               <label htmlFor="inputPassword">Agama</label>
                               <div className="form-label-group">
                               <select className="custom-select" id="" ref={input => this.agama = input}>
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
                               <label htmlFor="inputPassword">Jabatan</label>
                               <div className="form-label-group">
                                    <select className="mb-3 custom-select" ref={input => this.jabatan = input} onChange={() => this.setState({jabatan:this.jabatan.value})}>
                                        <option value="" hidden>Jabatan</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Karyawan">Karyawan</option>
                                    </select>
                               </div>
                           </div>

                            
                                {
                                    this.state.jabatan ? 
                                    <div className="form">
                                        <label htmlFor="inputPassword">Divisi</label>
                                        <div className="form-label-group">
                                                <select className="mb-3 custom-select" ref={input => this.divisi = input} onChange={()=>this.setState({selectDivisi : this.divisi.value})}>
                                                <option value='' hidden>Divisi</option>
                                                    {this.renderDivisi()}
                                                </select>
                                        </div>
                                    </div>  
                                    :
                                    null
                                }

                            
                                {
                                    this.state.selectDivisi ? 
                                    <div className="form">
                                    <label htmlFor="inputPassword">Pekerjaan</label>
                                    <div className="form-label-group">
                                            <select className="mb-3 custom-select" ref={input => this.subDivisi = input} >
                                                <option value='' hidden>Pekerjaan</option>
                                                {this.renderSubDivisi()}
                                            </select>
                                    </div>
                                </div>
                                
                                    :null
                                }
                           
                          

                           <div className="form mt-3">
                               <label htmlFor="inputPassword">No HP</label>
                               <input type="text" ref={input => this.phone = input} maxlength="13"/>
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
      divisi : state.auth.divisi,
      token : state.auth.token
    }
  }
export default connect(mapStateToProps,{})(Register)
