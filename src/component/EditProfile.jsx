import React, { Component } from 'react'
import axios from '../config/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'


 class EditProfile extends Component {


    state={
        selectDivisi : '',
        jabatan: '',
        divisi : [],
        subdivisi:[],
        profile : ''
    }
    getKaryawan = () =>{
   
        axios.get('/karyawan/profile/'+this.props.match.params.idkaryawan)
                .then(res => {
                     this.setState({profile : res.data})
                     }).catch(err => {
                         console.log(err)
                     })
     
    }
    onUpdateAdmin = () =>{
        let nik = parseInt(this.nik.value)
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let nama = this.nama.value
        let gender = this.gender.value
        let agama = this.agama.value
        let pendidikan = this.pendidikan.value
        let divisi_id = this.divisi.value == '' ? this.state.profile.divisi_id : this.divisi.value
        let jabatan = this.jabatan.value =='' ? this.state.profile.jabatan : this.jabatan.value 
        let subdivisi_id = this.subDivisi.value == '' ? this.state.profile.subdivisi_id : this.subDivisi.value
        let tanggal_lahir = this.tanggal_lahir.value == '' ? this.state.profile.tanggal_lahir : this.tanggal_lahir.value
        tanggal_lahir = moment(tanggal_lahir).format('YYYY-MM-DD HH-mm-ss ')


        axios.patch('/karyawan/'+this.props.match.params.idkaryawan,{
            nik,username,email,password,nama,gender,agama,pendidikan,divisi_id,jabatan,subdivisi_id,tanggal_lahir
        }).then(res=> {
            alert('Success')
        })
        
    }

    onUpdate = () =>{
        let nik = parseInt(this.nik.value)
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let nama = this.nama.value
        let gender = this.gender.value
        let agama = this.agama.value
        let pendidikan = this.pendidikan.value
        let tanggal_lahir = this.tanggal_lahir.value == '' ? this.state.profile.tanggal_lahir : this.tanggal_lahir.value
            tanggal_lahir = moment(tanggal_lahir).format('YYYY-MM-DD HH-mm-ss ')
        axios.patch('/karyawan/'+this.props.match.params.idkaryawan,{
            nik,username,email,password,nama,gender,agama,pendidikan,tanggal_lahir
        }).then(res=> {
            alert('Success')
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
        this.getKaryawan()
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
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
        let {nik,username,email,nama,gender,agama,pendidikan,jabatan,divisi,subDivisi, tanggal_lahir} = this.state.profile 
        if(this.props.jabatan === 'admin'){

            return (
                <div className="container col-8 text-left">
                <div className="card card-register mx-auto mb-5" style={{marginTop:100}}>
                    <div className="card-header">Edit  Account</div>
                    <div className="card-body">
                        <form onSubmit={e => e.preventDefault()} className="mb-5">
                            <p>*Catatan Jika Tidak mau di ubah biarkan saja</p>
                            <div className="form-group">
                                <label htmlFor="inputEmail">NIK</label>
                                <div className="form-label-group">
                                    <input type="number" defaultValue={nik} className="form-control" placeholder="NIK"
                                        required="required" ref={input => {this.nik = input}} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Username</label>
                                <div className="form-label-group">
                                    <input type="text" defaultValue={username}  className="form-control" placeholder="Username"
                                        required="required" ref={input => this.username = input}/>
                                </div>
                            </div>
                            <div className="form">
                                <label htmlFor="inputEmail">Email address</label>
                                <div className="form-label-group">
                                    <input type="email"  defaultValue={email} className="form-control"
                                        placeholder="Email address" required="required" ref={input => this.email= input}/>
                                </div>
                            </div>
                            <div className="form">
                                <label htmlFor="inputEmail">Password</label>
                                <div className="form-label-group">
                                    <input type="Password"  className="form-control"
                                        placeholder="Password" ref ={input => this.password = input}/>
                                </div>
                            </div>
                            <div className="form">
                                <label htmlFor="inputPassword">Nama</label>
                                <div className="form-label-group">
                                    <input type="text" defaultValue={nama} className="form-control" placeholder="Nama"
                                        required="required" ref={input => this.nama = input}/>
                                </div>
                            </div>
                            <div className="form mt-3">
                                <label htmlFor="inputPassword">Jenis Kelamin</label>
                                <select defaultValue={gender} name="" id="" ref={input => this.gender = input}>
                                    <option value="Pria">Pria</option>
                                    <option value="Wanita">Wanita</option>
                                </select>
                                <div className="form mt-3">
                                   <label htmlFor="inputPassword">Tanggal Lahir</label>
                                   <input type="date" defaultValue={tanggal_lahir} ref={input => this.tanggal_lahir = input}/>
                               </div>
                            </div>
                            <div className="form">
                                <label htmlFor="inputPassword">Agama</label>
                                <div className="form-label-group">
                                <select defaultValue={agama} name="" id="" ref={input => this.agama = input}>
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
                                <select defaultValue={pendidikan} type="text" className="form-control"
                                         required="required" ref={input => this.pendidikan = input}>
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
                                        <select className="mb-3" defaultValue={jabatan} ref={input => this.jabatan = input} onChange={() => this.setState({jabatan:this.jabatan.value})}>
                                            <option value="" hidden>Jabatan</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Karyawan">Karyawan</option>
                                        </select>
                                   </div>
    </div>
                               <div className="form">
                                   <label htmlFor="inputPassword">Divisi</label>
                                   <div className="form-label-group">
                                        <select className="mb-3" defaultValue={divisi} ref={input => this.divisi = input} onChange={()=>this.setState({selectDivisi : this.divisi.value})}>
                                        <option value="" hidden>Divisi</option>
                                            {this.renderDivisi()}
                                        </select>
                                   </div>
                               </div>   <div className="form">
                                   <label htmlFor="inputPassword">Pekerjaan</label>
                                   <div className="form-label-group">
                                        <select className="mb-3" defaultValue={subDivisi} ref={input => this.subDivisi = input} >
                                        <option value="" hidden>Pekerjaan</option>
                                            {this.renderSubDivisi()}
                                        </select>
                                   </div>
                               </div>
                             
                         
                            <button className="btn btn-primary btn-block mt-3" onClick={this.onUpdateAdmin}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className="container col-8 text-left">
            <div className="card card-register mx-auto mb-5" style={{marginTop:100}}>
                <div className="card-header">Edit  Account</div>
                <div className="card-body">
                    <form onSubmit={e => e.preventDefault()} className="mb-5">
                        <p>*Catatan Jika Tidak mau di ubah biarkan saja</p>
                        <div className="form-group">
                            <label htmlFor="inputEmail">NIK</label>
                            <div className="form-label-group">
                                <input type="number" defaultValue={nik} className="form-control" placeholder="NIK"
                                    required="required" ref={input => {this.nik = input}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Username</label>
                            <div className="form-label-group">
                                <input type="text" defaultValue={username}  className="form-control" placeholder="Username"
                                    required="required" ref={input => this.username = input}/>
                            </div>
                        </div>
                        <div className="form">
                            <label htmlFor="inputEmail">Email address</label>
                            <div className="form-label-group">
                                <input type="email"  defaultValue={email} className="form-control"
                                    placeholder="Email address" required="required" ref={input => this.email= input}/>
                            </div>
                        </div>
                        <div className="form">
                            <label htmlFor="inputEmail">Password</label>
                            <div className="form-label-group">
                                <input type="Password"  className="form-control"
                                    placeholder="Password" ref ={input => this.password = input}/>
                            </div>
                        </div>
                        <div className="form">
                            <label htmlFor="inputPassword">Nama</label>
                            <div className="form-label-group">
                                <input type="text" defaultValue={nama} className="form-control" placeholder="Nama"
                                    required="required" ref={input => this.nama = input}/>
                            </div>
                        </div>
                        <div className="form mt-3">
                            <label htmlFor="inputPassword">Jenis Kelamin</label>
                            <select defaultValue={gender} name="" id="" ref={input => this.gender = input}>
                                <option value="Pria">Pria</option>
                                <option value="Wanita">Wanita</option>
                            </select>
                            <div className="form mt-3">
                               <label htmlFor="inputPassword">Tanggal Lahir</label>
                               <input type="date" defaultValue={tanggal_lahir} ref={input => this.tanggal_lahir = input}/>
                           </div>
                        </div>
                        <div className="form">
                            <label htmlFor="inputPassword">Agama</label>
                            <div className="form-label-group">
                            <select defaultValue={agama} name="" id="" ref={input => this.agama = input}>
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
                            <select defaultValue={pendidikan} type="text" className="form-control"
                                     required="required" ref={input => this.pendidikan = input}>
                                         <option value="SMA/SMK">SMA/SMK</option>
                                         <option value="S1">S1</option>
                                         <option value="S2">S2</option>
                                         <option value="S3">S3</option>
                                     </select>
                            </div>
                        </div>                           
                     
                        <button className="btn btn-primary btn-block mt-3" onClick={this.onUpdate}>Update</button>
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
      jabatan : state.auth.jabatan
    }
  }
export default connect(mapStateToProps)(EditProfile)
