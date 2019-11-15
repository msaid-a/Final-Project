import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'



export class DetailGaji extends Component {

    state={
        gaji : []
    }

    getKaryawan = () =>{
   
        axios.get('http://localhost:2020/gaji/'+this.props.match.params.idgaji)
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
        if(this.state.gaji.length === 0){
            return <div>
                <h1>Loading</h1>
            </div>
        }
        return (
            <div>
                {this.tampilGaji()}
            </div>
        )
    }
}

export default DetailGaji
