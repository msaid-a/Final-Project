import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Chart } from 'primereact/chart';

const bcrypt = require('bcryptjs')

export class Dasboard extends Component {

    state={
        data :null,
        pekerjaan:[],
        jumlah:[]
    }

    componentDidMount = () =>{
        this.getData()
    }

    getData = () =>{
        if(bcrypt.compareSync("admin", this.props.jabatan)){
          return  axios.get('/karyawan/total',{
              headers:{
                  keys : this.props.token
              }
          })
                .then(res=>{
                    this.setState({data : res.data})
                    this.filter()

                })
                    // .then(res=>{
                    //     this.setState({data:res.data})
                    //     let karyawan = this.state.data.filter(data => {
                    //         return data.jabatan.includes('Karyawan')
                    //     })
                    //     let manager = this.state.data.filter(data => {
                    //         return data.jabatan.includes('Manager')
                    //     })
                    //     this.setState({karyawan,manager}) 
                    //    })
        }
        axios.get('/karyawan/total/'+this.props.divisi,{
            headers:{
                keys : this.props.token
            }
        })
            .then(res=>{
                this.setState({data : res.data})
                console.log(res.data)
                this.filter()
            })
        
               

    }

    filter = () =>{
        const jumlah = this.state.data.map(data =>{
            return data.jumlah_karyawan
        })
        this.setState({jumlah : jumlah})
        const pekerjaan = this.state.data.map(data =>{
            return data.subDivisi
        })
        this.setState({pekerjaan: pekerjaan})
        
    }

    render() {
      if(this.state.data === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                     <span class="sr-only">Loading...</span>
                </div>)
      }
        const data = {
            labels: this.state.pekerjaan,
            datasets: [
              {
                label: 'Data Karyawan',
                backgroundColor: '#42A5F5',
                data: this.state.jumlah
              }
            ] 
          };

        
        

          
      if(bcrypt.compareSync("Karyawan", this.props.jabatan)){
          return <Redirect to="/" ></Redirect>
      }
      if(!this.props.iD){
        return <Redirect to="/" ></Redirect>

      }
    
        return (
            <div style={{marginTop:90}} className="container">
                <div className="row ">

                     <Chart className="mx-auto" type='bar' data={data} />

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
export default connect(mapStateToProps)(Dasboard)
