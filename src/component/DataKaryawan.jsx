import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class DataKaryawan extends Component {

    state={
        karyawan : [],
        modal6: false,
        modal7: false,
        selectKaryawan : {id :'', nama: '', nik:''}
    }


toggle = nr => (id,nama,nik) => {
    axios.get('http://localhost:2020/karyawan/' + id).then(res => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber],
          selectKaryawan :{id, nama, nik}
        });
    })
  }

  toggleCancel = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber],
        });
  }

saveGaji = (id, nama, nik) =>{
    let bulan = this.bulan.value
    let tahun = this.tahun.value
    let gaji = parseInt(this.gaji.value)
    let tunjanganKeluarga = parseInt(this.keluarga.value)
    let tunjanganTransportasi=parseInt(this.transportasi.value)
    let bonus= parseInt(this.bonus.value)

    axios.post('http://localhost:2020/gaji',{
        id_User : id,
        nama,
        nik,
        bulan,
        tahun,
        gaji,
        tunjanganKeluarga,
        tunjanganTransportasi,
        bonus

    }).then(res=>{
        alert('success')
        this.toggleCancel(8)()
    }).catch(err => {
        alert(err.message)
    })
}


getData = async () =>{
    axios.get('http://localhost:2020/karyawan')
    .then(res => {
        this.setState({karyawan : res.data})
    })
}


componentDidMount= () =>{
    this.getData()
}

renderKaryawan = () =>{
    let no = 0
    return this.state.karyawan.map(data => {
        no++
        return (<tr>
            <td>{no}</td>
            <td>{data.nik}</td>
            <td>{data.email}</td>
            <td>{data.nama}</td>
            <td>{data.gender}</td>
            <td>{data.agama}</td>
            <td>{data.pendidikan}</td>
            <td>{data.jabatan}</td>
            <td>{data.pekerjaan}</td>
            <td><button className="btn btn-primary btn-sm">Edit</button> <button className="btn btn-danger btn-sm">Delete</button> <button className="btn btn-success btn-sm" onClick={()=>this.toggle(8)(data.id, data.nama, data.nik)}>Add Gaji</button></td>

        </tr>)
    })
}

    render() {
        if(!this.props.userName){
            return <Redirect to ='/'></Redirect>
        }
        let {id, nama, nik} = this.state.selectKaryawan
        return (
            <div>
                <form style={{marginTop:80}} className="ml-auto">
                    <div className="form-group d-flex justify-content-end">
                    <label className="h5 mt-2">seach by :</label>
                    <select className="mr-1">
                        <option value="Manager Aplikasi">Manager Aplikasi</option>
                        <option value="Manager Marketing">Manager Marketing</option>
                        <option value="Karyawan Aplikasi">Karyawan Aplikasi</option>
                        <option value="Karyawan Marketing">Karyawan Marketing</option>
                    </select>
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
                    <th>Email</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                    <th>Agama</th>
                    <th>Pendidikan</th>
                    <th>Jabatan</th>
                    <th>Pekerjaan</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{fontSize: 15}}>
                        {this.renderKaryawan()}
                    </tbody>
                </table>
                <MDBContainer>
      <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right">
        <MDBModalHeader toggle={this.toggleCancel(8)}>{nama}</MDBModalHeader>
        <MDBModalBody>
            <form onSubmit={e=> e.preventDefault()}>
            <select name="Bulan" className="mb-3 form-control" ref={input=> this.bulan = input} >
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
                <option value="Maret">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="Agustus">Agustus</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">Novmber</option>
                <option value="Desember">Desember</option>
            </select>
            <input className="form-control mb-3" type="number" placeholder="Tahun" ref={input => this.tahun =input}/>
                <input className="form-control mb-3" type="number" placeholder="Gaji Pokok" ref={input => this.gaji =input}/>
                <input className="form-control mb-3" type="number" placeholder="Tunjangan Keluarga" ref={input => this.keluarga =input}/>
                <input className="form-control mb-3" type="number" placeholder="Tunjangan Transfortasi" ref={input => this.transportasi =input}/>
                <input className="form-control mb-3" type="number" placeholder="Bonus" ref={input => this.bonus = input}/>
            </form>
        </MDBModalBody> 
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleCancel(8)}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={()=> this.saveGaji(id,nama, nik)}>Submit</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
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
