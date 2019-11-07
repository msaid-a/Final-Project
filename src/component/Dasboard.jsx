import React, { Component } from 'react'
import axios from '../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export class Dasboard extends Component {

    state={
        data :[],
        karyawan : [],
        manager : []
    }

    componentDidMount = () =>{
        this.getData()
    }
    getData = () =>{
        if(this.props.divisi =='admin'){
          return  axios.get('/karyawan')
                    .then(res=>{
                        this.setState({data:res.data})
                        let karyawan = this.state.data.filter(data => {
                            return data.jabatan.includes('Karyawan')
                        })
                        let manager = this.state.data.filter(data => {
                            return data.jabatan.includes('Manager')
                        })
                        this.setState({karyawan,manager}) 
                       })
        }
        axios.get('/karyawan',{
            params :{
                divisi : this.props.divisi
            }
        })
                .then(res=>{
                    this.setState({data:res.data})
                    let karyawan = this.state.data.filter(data => {
                        return data.jabatan.includes('Karyawan')
                    })
                    let manager = this.state.data.filter(data => {
                        return data.jabatan.includes('Manager')
                    })
                    this.setState({karyawan,manager}) 
                   })

    }


    render() {
      if(this.props.jabatan == 'Karyawan'){
          return <Redirect to="/" ></Redirect>
      }
      if(!this.props.iD){
        return <Redirect to="/" ></Redirect>

      }
        return (
            <div style={{marginTop:90}} className="container">
                <div className="row d-flex justify-content-center">

               <div className="card col-4 bg-primary "  >
                   <img className="card-img-top w-100" src="img/karyawan.png" alt="Card image cap" />
                   <div className="card-body">
                       <h5 className="card-title text-white">Manager</h5>
                       <h5 className="card-title text-white">{this.state.manager.length}</h5>
                   </div>
               </div>
               <div className="card col-4 bg-danger ml-5"  >
                   <img className="card-img-top w-100" src="img/karyawan.png" alt="Card image cap" />
                   <div className="card-body">
                       <h5 className="card-title text-white">Karyawan</h5>
                       <h5 className="card-title text-white">{this.state.karyawan.length}</h5>
                   </div>
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
      divisi : state.auth.divisi
    }
  }
export default connect(mapStateToProps)(Dasboard)
