import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import randtoken  from 'rand-token'
import { Chart } from 'primereact/chart';
import { number } from 'prop-types'


export class Dasboard extends Component {

    state={
        data :[],
        pekerjaan:[],
        jumlah:[]
    }

    componentDidMount = () =>{
        this.getData()
    }

    getData = () =>{
        if(this.props.divisi =='admin'){
          return  axios.get('/karyawan/total')
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
        axios.get('/karyawan/total/'+this.props.divisi)
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

        
        

          
      if(this.props.jabatan == 'Karyawan'){
          return <Redirect to="/" ></Redirect>
      }
      if(!this.props.iD){
        return <Redirect to="/" ></Redirect>

      }
      if(this.state.data.length === 0 ){
          return <h1>Loading</h1>
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
      divisi : state.auth.divisi
    }
  }
export default connect(mapStateToProps)(Dasboard)
