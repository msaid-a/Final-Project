import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import axios from '../../config/index'
import { Paginator } from 'primereact/paginator';


class Gaji extends Component {

    state={
        gaji : null,
        first: 0,
        rows: 10,
        lastIndex : 10
    }

getData =  () =>{
    axios.get('/gaji/profile/'+this.props.iD,{
        headers:{
        keys : this.props.token
    }})
    .then(res => {
        this.setState({gaji : res.data})
    })
}


componentDidMount= () =>{
    this.getData()
}

renderGaji = (first,last) =>{
    let no = 0
    return this.state.gaji.slice(first,last).map(data => {
        let total= 0
        total += data.gaji
        total +=data.tunjanganKeluarga
        total +=data.tunjanganTransportasi
        total += data.bonus
        no++
        return (<tr>
            <td className="align-middle">{no}</td>
            <td className="align-middle">{`${data.bulan}/${data.tahun}`}</td>
            <td className="align-middle">Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
            <td className="align-middle"><Link to={'/detailgaji/'+data.id} className='btn btn-outline-dark'>Rincian</Link></td>

        </tr>)
    })
}

onPageChange(event) {
    this.setState({
        first: event.first,
        rows: event.rows,
        lastIndex : event.first + event.rows
    });
}
    render() {
        if(!this.props.iD){
            return <Redirect to="/"></Redirect>
        }
        if(this.state.gaji === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
        }
        if(this.state.gaji.length === 0 ){
            return (<div style={{marginTop:80}}>
                        <h1 >Mohon maaf gaji belum di input</h1>
                        <h1 >Terimakasih!!!</h1>
                    </div>)
        }
        return (
            <div className="container">
                <div style={{marginTop:80}} className="ml-auto mb-5">
                    <h1>Data Gaji Bulanan</h1>
                </div>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table mb-5">
                    <thead style={{fontSize: 15, height:40}}  className='thead-dark'>
                    <tr>
                    <th>NO</th>
                    <th>Bulan/Tahun</th>
                    <th>Total</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{fontSize: 15}}>
                        {this.renderGaji(this.state.first, this.state.lastIndex)}
                    </tbody>
                </table>
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.gaji.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
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

export default connect(mapStateToProps,{})(Gaji)
