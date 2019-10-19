import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class DataKaryawan extends Component {

    state={
        gaji : []
    }

getData =  () =>{
    axios.get('http://localhost:2020/gaji')
    .then(res => {
        this.setState({gaji : res.data})
    })
}


componentDidMount= () =>{
    this.getData()
}

renderGaji = () =>{
    let no = 0
    let total= 0
    return this.state.gaji.reverse().map(data => {
        total += data.gaji
        total +=data.tunjanganKeluarga
        total +=data.tunjanganTransportasi
        total += data.bonus
        no++
        return (<tr>
            <td>{no}</td>
            <td>{data.nik}</td>
            <td>{data.nama}</td>
            <td>{`${data.bulan}/${data.tahun}`}</td>
            <td>{data.tunjanganKeluarga}</td>
            <td>{data.tunjanganTransportasi}</td>
            <td>{data.gaji}</td>
            <td>{data.bonus}</td>
            <td>{total}</td>
        </tr>)
    })
}

    render() {
        if(this.props.userName !='admin'){
            return <Redirect to ='/'></Redirect>
        }
        return (
            <div>
                <form style={{marginTop:80}} className="ml-auto">
                    <div className="form-group d-flex justify-content-end">

                        <label className="sr-only">Password</label>
                            <input type="text" className=""  placeholder="Search"></input>
                        <button type="submit" class="btn btn-primary ml-1">Seach</button>
                             </div>
                </form>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table ">
                    <thead style={{fontSize: 15}}  className='thead-dark' style={{height:40}}>
                    <tr>
                    <th>NO</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Bulan/Tahun</th>
                    <th>Gaji Pokok</th>
                    <th>Tunjangan Keluarga</th>
                    <th>Tunjangan Transportasi</th>
                    <th>Bonus</th>
                    <th>Total</th>
                    </tr>
                    </thead>
                    <tbody style={{fontSize: 15}}>
                        {this.renderGaji()}
                    </tbody>
                </table>
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

export default connect(mapStateToProps,{})(DataKaryawan)
