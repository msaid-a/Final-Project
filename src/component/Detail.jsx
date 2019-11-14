import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from '../config/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'



export class Detail extends Component {

    state={
        profile : []
    }

    getKaryawan = () =>{
   
        axios.get('/karyawan/profile/'+this.props.match.params.idkaryawan)
                .then(res => {
                     this.setState({profile : res.data})
                     }).catch(err => {
                         console.log(err)
                     })
     
    }
    

    componentDidMount = () =>{
        this.getKaryawan()
    }

    tampilProfile = () =>{
    let {nik,username,email,divisi,nama,gender,agama,pendidikan,jabatan,subDivisi,tanggal_lahir,phone,id} = this.state.profile 
       console.log(this.state.profile)
       return( <div className="row mt-5 ">
            <div className="col-4 mt-4">
            <img />
        </div>
        <div className="col-6 mt-4">
        <h1>Hello </h1>

             <table className="table table-hover text-left mb-5">
                 <tr>
                     <td>NIK :</td>
                     <td>{nik}</td>
                 </tr>
                 <tr>
                     <td>Name :</td>
                     <td>{nama}</td>
                 </tr>
                 <tr>
                     <td>Username :</td>
                     <td>{username}</td>
                 </tr>
                 <tr>
                     <td>Email :</td>
                     <td>{email}</td>
                 </tr>
                 <tr>
                     <td>Gender :</td>
                     <td>{gender}</td>
                 </tr>
                 <tr>
                     <td>Tanggal Lahir :</td>
                     <td>{tanggal_lahir}</td>
                 </tr>
                 <tr>
                     <td>Agama :</td>
                     <td>{agama}</td>
                 </tr>
                 <tr>
                     <td>Pendidikan :</td>
                     <td>{pendidikan}</td>
                 </tr>
                 <tr>
                     <td>Jabatan :</td>
                     <td>{jabatan}</td>
                 </tr>
                 <tr>
                     <td>Divisi :</td>
                     <td>{divisi}</td>
                 </tr>
                 <tr>
                     <td>Pekerjaan :</td>
                     <td>{subDivisi}</td>
                 </tr>
                 <tr>
                     <td>Nomor HP :</td>
                     <td>{phone}</td>
                 </tr>
             </table>
             <Link className="btn btn-danger" to={"/editprofile/"+id}>Edit Profile</Link>
        </div>
    </div>)
    }

    render() {
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
        return (
            <div className="container">
                {this.tampilProfile()}
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
export default connect(mapStateToProps)(Detail)
