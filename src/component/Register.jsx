import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Register extends Component {
    
    state={
        selectDivisi : '',
        jabatan: '',
        divisi : [],
        subdivisi:[]
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
        let divisi = this.divisi.value
        let jabatan = this.jabatan.value
        let pekerjaan = this.pekerjaan.value
        
        axios.post('http://localhost:2020/karyawan/',{
            nik,username,email,password,nama,gender,agama,pendidikan,divisi,jabatan,pekerjaan
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
    getDivisi = () =>{
        axios.get('http://localhost:2020/divisi')
            .then(res=>{
                this.setState({divisi: res.data})
            })
        axios.get('http://localhost:2020/subdivisi')
            .then(res=>{
                this.setState({subdivisi:res.data})
            })
    }

    componentDidMount = () =>{
        this.getDivisi()
    }
    
    renderDivisi = () =>{
        return this.state.divisi.map(data => {
            return(<option value={data.divisi}>{data.divisi}</option>)
        })
    }

    renderSubDivisi = () =>{
        console.log(this.state.jabatan)
        console.log(this.state.selectDivisi)
        if(this.state.jabatan =="Manager"){
            return <option value={'Manager'+this.selectDivisi}>Manager</option>
        }else{
            let subdivisi = this.state.subdivisi.filter(data=>{
                return data.divisi.includes(this.state.selectDivisi)
            })
            console.log(subdivisi)
            return subdivisi.map (data => {
                return <option value={data.subDivisi}>{data.subDivisi}</option>
            })
        }

    }

    // onPekerjaan = () =>{
    //     if(!this.state.jabatan){
    //         return (
    //         <select> <option value='' Hidden>Pekerjaan</option> </select>
    //         )}
    //     if(this.state.jabatan == "Karyawan Aplikasi"){
    //         return(
    //             <select ref ={input => this.pekerjaan = input}>
    //                 <option hidden>Pekerjaan</option>
    //                 <option value="Full Stack Developer">Full Stack Developer</option>
    //                 <option value="Front End Developer">Front End Developer</option>
    //                 <option value="Back End Developer">Back End Developer</option>
    //             </select>
                
    //         )
    //     }
    //     if(this.state.jabatan == "Karyawan Marketing"){
    //         return (
    //         <select ref ={input => this.pekerjaan = input}>
    //                 <option hidden>Pekerjaan</option>
    //                 <option value="Digital Marketing">Digital Marketing</option>
    //                 <option value="Sales">Sales</option>
    //             </select>
    //         )
    //     }

    //     if(this.state.jabatan.includes('Manager')){
    //         return (
    //         <select ref ={input => this.pekerjaan = input}>
    //                 <option value="Digital Marketing">Manager</option>
    //             </select>
    //         )
    //     }
        
    // }




    
    render() {
        if(this.props.jabatan != 'admin'){
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
                                   <select type="text" className="form-control"
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
                                    <select className="mb-3" ref={input => this.jabatan = input} onChange={() => this.setState({jabatan:this.jabatan.value})}>
                                        <option value="" hidden>Jabatan</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Karyawan">Karyawan</option>
                                    </select>
                               </div>
</div>
                           <div className="form">
                               <label htmlFor="inputPassword">Divisi</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.divisi = input} onChange={()=>this.setState({selectDivisi : this.divisi.value})}>
                               
                                        {this.renderDivisi()}
                                    </select>
                               </div>
                           </div>   <div className="form">
                               <label htmlFor="inputPassword">Pekerjaan</label>
                               <div className="form-label-group">
                                    <select className="mb-3" ref={input => this.pekerjaan = input} >
                                        {this.renderSubDivisi()}
                                    </select>
                               </div>
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
      jabatan : state.auth.jabatan
    }
  }
export default connect(mapStateToProps,{})(Register)
