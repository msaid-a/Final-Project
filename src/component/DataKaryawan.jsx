import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import axios from '../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DataKaryawan extends Component {

    state={
        karyawan : [],
        search :[],
        modal : false,
        modal2: false,
        selectKaryawan : {id :'', nama: '', nik:''},
        show : 0
    }


toggle  = (id,nama,nik) => {
    axios.get('/karyawan/' + id).then(res => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectKaryawan :{id, nama, nik}
        }));
    })
 }

  toggleTugas =  (id,nama,nik) => {
    axios.get('/karyawan/' + id).then(res => {
        this.setState(prevState => ({
            modal2: !prevState.modal,
            selectKaryawan :{id, nama, nik}
        }));
    })
  }

  toggleTugasCancel = () =>{
    this.setState(prevState => ({
        modal2 : false,
    }))

}


  toggleCancel = () =>{
    this.setState(prevState => ({
        modal : !prevState.modal,
    }))
}

saveGaji = (id, nama, nik) =>{
    if(this.props.jabatan=="admin"){
        let bulan = this.bulan.value
        let tahun = this.tahun.value
        let gaji = parseInt(this.gaji.value)
        let tunjanganKeluarga = parseInt(this.keluarga.value)
        let tunjanganTransportasi=parseInt(this.transportasi.value)
        let bonus= parseInt(this.bonus.value)
    
        axios.post('/gaji',{
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
            axios.post('/history',{
                user:this.props.userName,
                desc:'Telah memberi gaji kepada' + nama,
                divisi : this.props.divisi,
                date: new Date() 
            }).then(res=>{
                alert('success')            
            })
            // this.toggleCancel()
        }).catch(err => {
            alert(err.message)
        })
    }
}


getData =  () =>{
    if(this.props.jabatan =="admin"){
     return   axios.get('/karyawan')
                .then(res => {
                     this.setState({karyawan : res.data,
                    search: res.data})
                     })
    }
    if(this.props.jabatan.includes('Manager')){
        let karyawan = this.props.jabatan.split(' ')[1]
        console.log(karyawan)
        return   axios.get('/karyawan',{
            params:{
                divisi : this.props.divisi
                // tambah jabatan karyawan nanti
            }
        })
        .then(res => {
             this.setState({karyawan : res.data, search: res.data})
             })
    }

}

postTugas = (id,nama,nik) =>{
    let title = this.title.value
    let description = this.description.value
    let deadline = this.deadline.value
    let from = this.props.userName
    let idUser = id
    let namaUser = nama
    let hasil = ''
    let status = 'belum di kumpulkan'

    axios.post('/tugas',{
        idUser,namaUser,title,description,deadline,from,hasil,status
    }).then(res=>{
        axios.post('/history',{
                user:this.props.userName,
                desc:'Telah memberi Tugas kepada' + nama,
                divisi:this.props.divisi,
                date: new Date() 
            }).then(res=>{
                alert('success')            
            })
    })
}


componentDidMount= () =>{
    this.getData()
}

deleteKaryawan = (nik) =>{
    axios.delete('/karyawan/delete/'+ nik,{
    }).then(res=>{
        axios.post('/history',{
                user:this.props.userName,
                desc:'Telah Menghapus Karyawan dengan id' + nik,
                divisi : this.props.divisi,
                date: new Date() 
            }).then(res=>{
                alert('success')            
                this.getData()
            })
    })
}

renderKaryawan = () =>{
    let no = 0
    let show = this.state.show
    if (!show) show = 5
    if(show == 'all') show = this.state.karyawan.length
    return this.state.search.slice(0,show).map(data => {
        no++
        if(this.props.jabatan =="admin"){

            return (<tr>
            <td>{no}</td>
            <td>{data.nik}</td>
            <td>{data.email}</td>
            <td>{data.nama}</td>
            <td>{data.gender}</td>
            <td>{data.subDivisi}</td>
           <td><Link to={'/detailkaryawan/'+data.id}><button className="btn btn-primary btn-sm m-1">Detail</button> </Link>
           <button className="btn btn-danger btn-sm m-1" onClick={()=> this.deleteKaryawan(data.nik)}>Delete</button> 
           <button className="btn btn-success btn-sm m-1" onClick={()=>this.toggle(data.id, data.nama, data.nik)} data-target='#gaji'>Add Gaji</button></td>
        </tr>)
        }

        if(this.props.jabatan.includes('Manager')){
            return (<tr>
                <td>{no}</td>
                <td>{data.nik}</td>
                <td>{data.email}</td>
                <td>{data.nama}</td>
                <td>{data.gender}</td>
                <td>{data.subDivisi}</td>
                <td><button className="btn btn-primary btn-sm m-1"onClick={()=>this.toggleTugas(data.id, data.nama, data.nik)} data-targer='#tugas'>Tambah Tugas</button> </td>
            </tr>)
            
        }
    })
}


onSearch = () =>{
     let result = this.state.karyawan.filter(data => {
                return data.nama.toLoweCase().includes(this.search.value.toLowerCase())
    })
    this.setState({search:result})
}



    render() {
        if(!this.props.userName){
            return <Redirect to ='/'></Redirect>
        }
        let {id, nama, nik} = this.state.selectKaryawan
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
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
                    <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="nama" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.karyawan})}}>Show All</button>
                             </div>
                </form>
                <table className=" table table-striped table-responsive-md btn-table mb-5">
                    <thead   className='thead-dark' style={{height:50}}>
                    <tr >
                    <th>NO</th>
                    <th>NIK</th>
                    <th>Email</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                    <th>Pekerjaan</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody className='text-left'style={{fontSize: 15}}>
                        {this.renderKaryawan()}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                <ModalHeader toggle={this.toggleCancel}>{nama}</ModalHeader>
        <ModalBody>
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
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleCancel}>Close</Button>
          <Button color="primary" onClick={()=> this.saveGaji(id,nama, nik)}>Submit</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.modal2} toggle={this.toggleTugas} fullHeight position="right" id='tugas'>
        <ModalHeader toggle={this.toggleTugasCancel}>{nama}</ModalHeader>
        <ModalBody>
            <form onSubmit={e=> e.preventDefault()}>
            <input type="text" name="" id="" placeholder="title" className="form-control" ref={input => {this.title = input}}/>
            <textarea className="form-control mt-3"  rows="3" placeholder="description"ref={input => {this.description = input}} ></textarea>
            
            <label>Deadline :</label>
            <input type="date" name="" id="" placeholder="title" className="form-control" ref={input => {this.deadline = input}}/>
            </form>
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleTugasCancel}>Close</Button>
          <Button color="primary" onClick={()=> this.postTugas(id,nama, nik)}>Submit</Button>
        </ModalFooter>
      </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      userName : state.auth.username,
      iD : state.auth.id,
      jabatan : state.auth.jabatan,
      divisi : state.auth.divisi
    }
  }

export default connect(mapStateToProps,{})(DataKaryawan)
