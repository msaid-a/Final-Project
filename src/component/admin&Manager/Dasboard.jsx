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
        jumlah:[],

        rateTugas : null,
        jumlahTugas : [],
        divisiTugas : [],

        dataGaji : null,
        divisiGaji : [],
        rataGaji : [],

        dataGajiPekerjaan : null,
        pekerjaanGaji : [],
        rataGajiPekerjaan : []

    }

    componentDidMount = () =>{
        this.getData()
        if(bcrypt.compareSync("admin", this.props.jabatan)){
            this.getRateTugas()
            this.getRataGaji()
            this.getGajiPekerjaan()
        }
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
        }
        axios.get('/karyawan/total/'+this.props.divisi,{
            headers:{
                keys : this.props.token
            }
        })
            .then(res=>{
                this.setState({data : res.data})
                this.filter()
            })
        
               

    }

    getRateTugas = () =>{
        axios.get('/ratetugas',{
            headers : {
                keys : this.props.token
            }
        }).then(res=>{
            this.setState({rateTugas : res.data})
            this.filterTugas()
        })
    }


    getRataGaji = () =>{
        axios.get('/ratagaji',{
            headers : {
                keys : this.props.token
            }
        }).then(res=>{
            this.setState({dataGaji : res.data})
            this.filterGajiDivisi()
        })
    }

    getGajiPekerjaan = ()=>{
        axios.get('/gajipekerjaan',{
            headers:{
                    keys : this.props.token
                
            }
        }).then(res=>{
            this.setState({dataGajiPekerjaan : res.data})
            this.filterGajiPekerjaan()
        }).catch(err=>{
            console.log(err)
        })
    }

    filter = () =>{
        const jumlah = this.state.data.map(data =>{
            return data.jumlah_karyawan
        })
        jumlah.push(0)
        this.setState({jumlah : jumlah})
        const pekerjaan = this.state.data.map(data =>{
            return data.subDivisi
        })
        this.setState({pekerjaan: pekerjaan})
        
    }

    filterTugas = () =>{
        const jumlah = this.state.rateTugas.map(data =>{
            return data.hasil
        })
        jumlah.push(0)
        this.setState({jumlahTugas : jumlah})
        const divisi = this.state.rateTugas.map(data =>{
            return data.divisi
        })
        this.setState({divisiTugas: divisi})
    } 

    filterGajiDivisi = () =>{
        const jumlah = this.state.dataGaji.map(data =>{
            return data.rata_rata
        })
        jumlah.push(0)
        this.setState({rataGaji : jumlah})
        const divisi = this.state.dataGaji.map(data =>{
            return data.divisi
        })
        this.setState({divisiGaji: divisi})
    }

    filterGajiPekerjaan = () =>{
        const jumlah = this.state.dataGajiPekerjaan.map(data =>{
            return data.rata_rata
        })
        jumlah.push(0)
        this.setState({rataGajiPekerjaan : jumlah})
        console.log(jumlah)
        const divisi = this.state.dataGajiPekerjaan.map(data =>{
            return data.subDivisi
        })
        this.setState({pekerjaanGaji: divisi})
    }


    render() {
      if(this.state.data === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                     <span class="sr-only">Loading...</span>
                </div>)
      }
      if(this.state.rateTugas === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)
      }
      if(this.state.dataGaji === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)
      }
      if(this.state.dataGajiPekerjaan === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)
      }
        const data = {
            labels: this.state.pekerjaan,
            datasets: [
              {
                label: 'Data Karyawan',
                backgroundColor: 'gray',
                data: this.state.jumlah
              }
            ] 
          };
        const dataTugas = {
            labels: this.state.divisiTugas,
            datasets: [
              {
                label: 'Jumlah Tugas Setiap Divisi',
                backgroundColor: 'gray',
                data: this.state.jumlahTugas
              }
            ] 
          };

        const GajiRata = {
            labels: this.state.divisiGaji,
            datasets: [
              {
                label: 'Rata Rata Gaji Setiap Divisi',
                backgroundColor: 'gray',
                data: this.state.rataGaji
              }
            ] 
          };
          
        const GajiRataPekerjaan = {
            labels: this.state.pekerjaanGaji,
            datasets: [
              {
                label: 'Rata-Rata Gaji Setiap Subdivisi',
                backgroundColor: 'gray',
                data: this.state.rataGajiPekerjaan
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

                        <Chart className="mx-auto col-10" type='bar' data={data} />
                         <Chart className="mx-auto col-10 mt-5" type='bar' data={dataTugas} />
                         <Chart className="mx-auto col-10 mt-5" type='bar' data={GajiRata} />
                         <Chart className="mx-auto col-10 mt-5" type='bar' data={GajiRataPekerjaan} />
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
