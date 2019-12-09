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
        rataGajiPekerjaan : [],

        dataTerlamabatBulan : null,
        namaTerlambatBulan : [],
        jumlahTugasTerlambat : []

    }

    componentDidMount = () =>{
        axios.get('/tugas',{
            headers :{
                keys : this.props.token
            }
        })
        .then(res=>{
        })
        this.getData()
        if(bcrypt.compareSync("admin", this.props.jabatan)){
            this.getRataGaji()
            this.getGajiPekerjaan()
        }
        this.getTerlambatBulan()
        this.getRateTugas()
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
        if(bcrypt.compareSync("admin", this.props.jabatan)){
          return  axios.get('/ratetugas',{
                headers : {
                    keys : this.props.token
                }
            }).then(res=>{
                this.setState({rateTugas : res.data})
                this.filterTugas()
            })

        }
           return axios.get('/ratetugas/'+ this.props.divisi,{
                headers : {
                    keys : this.props.token
                }
            }).then(res=>{
                this.setState({rateTugas : res.data})
                console.log(res.data)
                this.filterTugas()
            }).catch(err=>{
                console.log(err)
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


    getTerlambatBulan = ()=>{
        if(bcrypt.compareSync("admin", this.props.jabatan)){
            return axios.get('/terlambatbulan',{
                headers:{
                        keys : this.props.token               
                }
            }).then(res=>{
                this.setState({dataTerlamabatBulan : res.data})
                this.filterTerlambatBulan()
            }).catch(err=>{
                console.log(err)
            })

        }
        return axios.get('/terlambatbulan/'+this.props.divisi,{
            headers:{
                    keys : this.props.token               
            }
        }).then(res=>{
            this.setState({dataTerlamabatBulan : res.data})
            this.filterTerlambatBulan()
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
            if(bcrypt.compareSync("admin", this.props.jabatan)){
                return data.divisi
            }
            return data.nama
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
        const divisi = this.state.dataGajiPekerjaan.map(data =>{
            return data.subDivisi
        })
        this.setState({pekerjaanGaji: divisi})
    }

    filterTerlambatBulan = () =>{
        const jumlah = this.state.dataTerlamabatBulan.map(data =>{
            return data.terlambat
        })
        jumlah.push(0)
        this.setState({jumlahTugasTerlambat : jumlah})
        const divisi = this.state.dataTerlamabatBulan.map(data =>{
            return data.nama
        })
        this.setState({namaTerlambatBulan: divisi})
    }


    render() {
    
      if(this.state.data === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                     <span class="sr-only">Loading...</span>
                </div>)
      }
      if(this.state.rateTugas === null && bcrypt.compareSync("admin", this.props.jabatan)){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)
      }
      if(this.state.dataGaji === null && bcrypt.compareSync("admin", this.props.jabatan)){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)
      }
      if(this.state.dataGajiPekerjaan === null && bcrypt.compareSync("admin", this.props.jabatan)){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)

      }
      if(this.state.dataTerlamabatBulan === null){
        return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
        <span class="sr-only">Loading...</span>
        </div>)

      }
        const data = {
            labels: this.state.pekerjaan,
            datasets: [
              {
                label: 'Jumlah Karyawan',
                backgroundColor: 'gray',
                data: this.state.jumlah
              }
            ] 
          };
        const dataTugas = {
            labels: this.state.divisiTugas,
            datasets: [
              {
                label: 'Jumlah Tugas',
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

        const TerlambatBulanan = {
            labels: this.state.namaTerlambatBulan,
            datasets: [
              {
                label: 'Jumlah Tugas Terlambat',
                backgroundColor: 'gray',
                data: this.state.jumlahTugasTerlambat
              }
            ] 
          };
        
        

          
      if(bcrypt.compareSync("Karyawan", this.props.jabatan)){
          return <Redirect to="/" ></Redirect>
      }
      if(!this.props.iD){
        return <Redirect to="/" ></Redirect>

      }
    if(bcrypt.compareSync("admin", this.props.jabatan)){
        return (
            <div style={{marginTop:90}} className="container">
                <div className="row ">
                    <div className="card mx-auto col-10 bg-white p-0">
                        <div className="card-header">
                            Data Karyawan
                        </div>
                        <div className="card-body">
                            <Chart className="mx-auto col-10" type='bar' data={data} />

                        </div>
                    </div>

                    <div className="card mx-auto col-10 bg-white p-0 mt-5">
                        <div className="card-header">
                            Data Tugas Setiap Divisi
                        </div>
                        <div className="card-body">
                            <Chart className="mx-auto col-10" type='bar' data={dataTugas} />

                        </div>
                    </div>

                    <div className="card mx-auto col-10 bg-white p-0 mt-5">
                        <div className="card-header">
                            Rata-Rata Gaji Setiap Divisi
                        </div>
                        <div className="card-body">
                            <Chart className="mx-auto col-10" type='bar' data={GajiRata} />

                        </div>
                    </div>

                    <div className="card mx-auto col-10 bg-white p-0 mt-5">
                        <div className="card-header">
                            Rata-Rata Gaji Setiap Subdivisi
                        </div>
                        <div className="card-body">
                            <Chart className="mx-auto col-10" type='bar' data={GajiRataPekerjaan} />
                        </div>
                    </div>

                    <div className="card mx-auto col-10 bg-white p-0 mt-5">
                        <div className="card-header">
                            5 Orang yg sering terlambat Bulan Ini
                        </div>
                        <div className="card-body">
                            <Chart className="mx-auto col-10" type='bar' data={TerlambatBulanan} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div style={{marginTop:90}} className="container">
            <div className="row ">
      <div className="card mx-auto col-10 bg-white p-0">
          <div className="card-header">
              Data Karyawan
          </div>
          <div className="card-body">
              <Chart className="mx-auto col-10" type='bar' data={data} />

          </div>
      </div>
      <div className="card mx-auto col-10 bg-white p-0 mt-5">
          <div className="card-header">
              Data Tugas Setiap Karyawan
          </div>
          <div className="card-body">
              <Chart className="mx-auto col-10" type='bar' data={dataTugas} />

          </div>
      </div>
      <div className="card mx-auto col-10 bg-white p-0 mt-5">
          <div className="card-header">
              5 Orang Terlambat Bulan ini
          </div>
          <div className="card-body">
              <Chart className="mx-auto col-10" type='bar' data={TerlambatBulanan} />

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
      divisi : state.auth.divisi,
      token : state.auth.token
    }
  }
export default connect(mapStateToProps)(Dasboard)
