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
    
    saveAvatar = (id) =>{
        let formData = new FormData()
        let avatar = this.avatar.files[0]
            formData.append('avatar',avatar)
        axios.post('/avatar/'+id,formData)
            .then(res=>{
                this.getKaryawan()
            })
    }

    componentDidMount = () =>{
        this.getKaryawan()
    }

    tampilProfile = () =>{
    let {id,nik,username,email,divisi,nama,gender,agama,pendidikan,jabatan,subDivisi,tanggal_lahir,phone,id_user, avatar} = this.state.profile 
       console.log(this.state.profile)
       return( <div className="row mt-5 ">
            <div className="col-4 mt-5">
            <div className="card mt-4" style={{width: '18rem'}}>
                <img className="card-img-top" src={avatar} alt="Card image cap" />
                <div className="card-body">
                    
                    {/* <input type="file"   /> */}

  <div className="custom-file">
  <input type="file" className="custom-file-input" id="validatedCustomFile" ref={input => this.avatar =input} />
  <label className="custom-file-label text-left" htmlFor="validatedCustomFile">Choose file...</label>
</div>

                    <button className="btn btn-secondary btn-block mt-2" onClick={()=>this.saveAvatar(id)}>Save Image</button>
                </div>
            </div>

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
             <Link className="btn btn-danger" to={"/editprofile/"+id_user}>Edit Profile</Link>
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
