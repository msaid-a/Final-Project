import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


class Gaji extends Component {

    state={
        gaji : [],
        show : 0
    }

getData =  () =>{
    axios.get('http://localhost:2020/gaji',{
        params: {
            id_User: this.props.iD
        }
    })
    .then(res => {
        this.setState({gaji : res.data})
    })
}


componentDidMount= () =>{
    this.getData()
}

renderGaji = () =>{
    let no = 0
    let show = this.state.show
    if(!show) show = 5
    if(show =='all') show = this.state.gaji.length
    return this.state.gaji.slice(0,show).map(data => {
        let total= 0
        total += data.gaji
        total +=data.tunjanganKeluarga
        total +=data.tunjanganTransportasi
        total += data.bonus
        no++
        return (<tr>
            <td>{no}</td>
            <td>{`${data.bulan}/${data.tahun}`}</td>
            <td>Rp. {Intl.NumberFormat().format(data.tunjanganKeluarga).replace(/,/g, '.')}</td>
            <td>Rp. {Intl.NumberFormat().format(data.tunjanganTransportasi).replace(/,/g, '.')}</td>
            <td>Rp. {Intl.NumberFormat().format(data.gaji).replace(/,/g, '.')}</td>
            <td>Rp. {Intl.NumberFormat().format(data.bonus).replace(/,/g, '.')}</td>
            <td>Rp. {Intl.NumberFormat().format(total).replace(/,/g, '.')}</td>
        </tr>)
    })
}

    render() {
        if(!this.props.iD){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto">
                    <h1>Data Gaji Bulanan</h1>
                    <div className="form-group d-flex justify-content-end">
                    <label className="h5 mt-2">Show tables:</label>
                        <select  className="mr-auto" ref={input => this.show = input} onChange={() => this.setState({show:this.show.value})}>
                        <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">All</option>
                                    </select>
                        <label className="sr-only">Password</label>
                            <input type="text" className=""  placeholder="Search"></input>
                        <button type="submit" class="btn btn-primary ml-1">Seach</button>
                             </div>
                </form>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table mb-5">
                    <thead style={{fontSize: 15}}  className='thead-dark' style={{height:40}}>
                    <tr>
                    <th>NO</th>
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

export default connect(mapStateToProps,{})(Gaji)
