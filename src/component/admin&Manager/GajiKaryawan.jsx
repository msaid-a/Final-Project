import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import axios from '../../config/index'
import { Paginator } from 'primereact/paginator';
 

class DataKaryawan extends Component {

    state={
        gaji : [],
        search:[],
        first: 0,
        rows: 10,
        lastIndex : 10
        // show : ''
    }

getData =  () =>{
    axios.get('/gaji')
    .then(res => {
        console.log(res.data)
        this.setState({gaji : res.data})
        this.setState({search : res.data})
    })
}

onPageChange(event) {
    this.setState({
        first: event.first,
        rows: event.rows,
        lastIndex : event.first + event.rows
    });
}

componentDidMount= () =>{
    this.getData()
}

renderGaji = (first,last) =>{
    let no = 0

    return this.state.search.slice(first,last).map(data => {
        let total= 0
        total += data.gaji
        total +=data.tunjanganKeluarga
        total +=data.tunjanganTransportasi
        total += data.bonus
        no++
        return (<tr>
            <td>{no}</td>
            <td>{data.nama}</td>
            <td>{`${data.bulan}/${data.tahun}`}</td>
            <td>Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
            <td><Link to={'/detailgaji/'+data.id} className='btn btn-success'>Rincian</Link></td>
        </tr>)
    })
}

onSearch = () =>{
    let result = this.state.gaji.filter(data => {
               return data.nama.includes(this.search.value)
   })
   this.setState({search:result})
}

    render() {
        if(this.props.jabatan !=='admin'){
            return <Redirect to ='/'></Redirect>
        }
        return (
            <div className="container">
            <div className="row">
                
             </div>
                  <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="nama" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.gaji})}}>Show All</button>
                             </div>
                </form>
               
                <table className="table  table-striped table-responsive-md btn-table mb-5">
                    <thead style={{fontSize: 15, height:40}}  className='thead-dark' >
                    <tr>
                    <th>NO</th>
                    <th>Nama</th>
                    <th>Bulan/Tahun</th>
                    <th>Total</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{fontSize: 15}}>
                        {this.renderGaji(this.state.first,this.state.lastIndex)}
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
        divisi: state.auth.divisi
    }
  }

export default connect(mapStateToProps,{})(DataKaryawan)
