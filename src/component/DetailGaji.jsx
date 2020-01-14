import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import bcrypt from 'bcryptjs'
export class DetailGaji extends Component {

    state={
        gaji : null,
        numPages: null,
        pageNumber: 1,
    }

    getKaryawan = () =>{
   
        axios.get('http://localhost:2020/gaji/'+this.props.match.params.idgaji,{
            headers:{
            keys : this.props.token
        }})
                .then(res => {
                     this.setState({gaji : res.data})
                     console.log(this.state.gaji)
                     }).catch(err => {
                         console.log(err)
                     })
     
    }
    
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }

    componentDidMount = () =>{
        this.getKaryawan()
    }



    tampilGaji = () =>{
        let {nama,nik,bulan,tahun,gaji,tunjanganKeluarga,tunjanganTransportasi, bonus} = this.state.gaji[0] 
        let total = 0
            total +=gaji
            total +=tunjanganKeluarga
            total +=tunjanganTransportasi
            total +=bonus
           return( 
               <div style={{marginTop:90}}>
               <div  className='container d-flex mt-4 justify-content-center'>
                <div className="card col-6 p-5">
               <h1>Rincian Gaji </h1>
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
                         <td>Bulan :</td>
                         <td>{bulan}</td>
                     </tr>
                     <tr>
                         <td>Tahun :</td>
                         <td>{tahun}</td>
                     </tr>
                     <tr>
                         <td>Gaji Pokok:</td>
                         <td>Rp. {Intl.NumberFormat().format(gaji).replace(/,/g, '.')}</td>
                     </tr>
                     <tr>
                         <td>Tunjangan Transportasi :</td>
                         <td>Rp. {Intl.NumberFormat().format(tunjanganTransportasi).replace(/,/g, '.')}</td>
                     </tr>
                     <tr>
                         <td>Tunjangan Keluarga :</td>
                         <td>Rp. {Intl.NumberFormat().format(tunjanganKeluarga).replace(/,/g, '.')}</td>
                     </tr>
                     <tr>
                         <td>Bonus :</td>
                         <td>Rp. {Intl.NumberFormat().format(bonus).replace(/,/g, '.')}</td>
                     </tr>
                     <tr>
                         <td colSpan='2'>Total : Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
                     </tr>
                 </table>
                </div>
            </div>
            </div>
        )
        }
    render() {
        
        if(!this.props.token){
           return <Redirect to='/'></Redirect>
        }
        if(this.state.gaji === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                <span class="sr-only">Loading...</span>
             </div>)
        }
        let {id_user} = this.state.gaji[0]

        if(bcrypt.compareSync("admin", this.props.jabatan) === false && this.props.iD !== id_user){
            return <Redirect to="/ddd"></Redirect>
        }
        return (
            <div> 
                {this.tampilGaji()}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
      
      token : state.auth.token,
      iD : state.auth.id,
      jabatan : state.auth.jabatan
    }
  }
export default connect(mapStateToProps)(DetailGaji)
