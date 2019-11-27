import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'



export class DetailGaji extends Component {

    state={
        gaji : null
    }

    getKaryawan = () =>{
   
        axios.get('http://localhost:2020/gaji/'+this.props.match.params.idgaji,{
            headers:{
            keys : this.props.token
        }})
                .then(res => {
                     this.setState({gaji : res.data})
                    //  console.log(this.state.gaji[0])
                     }).catch(err => {
                         console.log(err)
                     })
     
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
               <h1>Rincian Gaji </h1>
               <div  className='container d-flex mt-4 justify-content-center'>
    
                 <table className="table table-hover text-left mb-5 col-6">
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
        )
        }
    render() {
        if(this.state.gaji === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                <span class="sr-only">Loading...</span>
             </div>)
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
      
      token : state.auth.token
    }
  }
export default connect(mapStateToProps)(DetailGaji)
