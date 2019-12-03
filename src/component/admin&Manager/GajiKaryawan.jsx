import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import axios from '../../config/index'
import { Paginator } from 'primereact/paginator';
import bcrypt from 'bcryptjs'

class DataKaryawan extends Component {

    state={
        gaji : null,
        search:[],
        first: 0,
        rows: 10,
        lastIndex : 10
        // show : ''
    }

getData =  () =>{
    axios.get('/gaji',{
        headers:{
        keys : this.props.token
    }})
    .then(res => {
        console.log(res.data)
        this.setState({gaji : res.data.reverse()})
        this.setState({search : res.data.reverse()})
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
            <td className="align-middle">{no}</td>
            <td className="align-middle">{data.nama}</td>
            <td className="align-middle">{`${data.bulan}/${data.tahun}`}</td>
            <td className="align-middle">Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
            <td className="align-middle"><Link to={'/detailgaji/'+data.id} className='btn btn-outline-dark'>Rincian</Link></td>
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
        if(!bcrypt.compareSync("admin", this.props.jabatan)){
            return <Redirect to ='/'></Redirect>
        }
        if(this.state.gaji === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
          }
        return (
            <div className="container">
                  <form  className="ml-auto mt-1" onClick={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <div className="mr-auto">
                        <h4>Gaji Karyawan</h4>
                    </div>
                            <input type="text" className=""  placeholder="Search By Name" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-secondary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-dark ml-1" onClick={()=>{this.setState({search:this.state.gaji})}}>Show All</button>
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
						totalRecords={this.state.search.length}
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

export default connect(mapStateToProps,{})(DataKaryawan)
