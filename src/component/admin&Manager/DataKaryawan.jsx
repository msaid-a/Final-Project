import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import moment from 'moment'
import { Paginator } from 'primereact/paginator';


class DataKaryawan extends Component {

    state={
        karyawan : [],
        search :[],
        modal : false,
        modal2: false,
        selectKaryawan : {id :'',id_karyawan:'', nama: '', nik:''},
        first: 0,
        rows: 10,
        lastIndex : 10
    }


toggle  = (id,id_karyawan,nama) => {
    axios.get('/karyawan/profile/' + id).then(res => {
        console.log(id)
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectKaryawan :{id,id_karyawan, nama}
        }));
    })
 }

  toggleTugas =  (id, id_karyawan , nama, nik) => {
    axios.get('/karyawan/profile/' + id).then(res => {
        this.setState(prevState => ({
            modal2: !prevState.modal,
            selectKaryawan :{id,id_karyawan, nama, nik}
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

saveGaji = (id, nama) =>{
    if(this.props.jabatan=="admin"){
        let bulan = this.bulan.value
        let tahun = this.tahun.value
        let gaji = parseInt(this.gaji.value)
        let tunjanganKeluarga = parseInt(this.keluarga.value)
        let tunjanganTransportasi=parseInt(this.transportasi.value)
        let bonus= parseInt(this.bonus.value)
        let now = moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
        axios.post('/gaji',{
            user_id : id,
            bulan,
            tahun,
            gaji,
            tunjanganKeluarga,
            tunjanganTransportasi,
            bonus
    
        }).then(res=>{
            axios.post('/history',{
                description:'Telah memberi gaji kepada ' + nama,
                user_id:this.props.iD,
                divisi : this.props.divisi,
                tanggal: now 
            }).then(res=>{
                alert('Success')         
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
                    console.log(res.data)
                     })
    }
    if(this.props.jabatan.includes('Manager')){
        return   axios.get(`/karyawan/divisi/${this.props.divisi}`,)
        .then(res => {
            console.log(res.data)
             this.setState({karyawan : res.data, search: res.data})
             })
    }

}

postTugas = (id,nama,nik) =>{
    let title = this.title.value
    let description = this.description.value
    let deadline = new Date(this.deadline.value)
        deadline = moment(deadline).format('YYYY-MM-DD HH-mm-ss')
    let pengirim = this.props.userName
    let user_id = id
    let hasil = ''
    let status = 'belum di kumpulkan'

    axios.post('/tugas/'+ user_id,{
        user_id,title,description,deadline,pengirim,hasil,status
    }).then(res=>{
        axios.post('/history',{
                description:'Telah memberi Tugas kepada ' + nama,
                user_id: this.props.iD,
                divisi : this.props.divisi,
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            }).then(res=>{
                alert('success')            
            })
    })
}


componentDidMount= () =>{
    this.getData()
}

deleteKaryawan = (id,username) =>{
    axios.delete('/karyawan/delete/'+ id,{
    }).then(res=>{
        axios.post('/history',{
                description:'Telah Menghapus Karyawan dengan username ' + username,
                user_id:this.props.iD,
                divisi : this.props.divisi,
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            }).then(res=>{
                alert('success')            
                this.getData()
            })
    })
}

renderKaryawan = (first,last) =>{
    let no = 0
    return this.state.search.slice(first,last).map(data => {
        no++
        if(this.props.jabatan =="admin"){

            return (<tr>
            <td className="align-middle">{no}</td>
            <td className="align-middle">{data.nik}</td>
            <td className="align-middle">{data.email}</td>
            <td className="align-middle">{data.nama}</td>
            <td className="align-middle">{data.gender}</td>
            <td className="align-middle">{data.subDivisi}</td>
           <td className="align-middle"><Link to={'/detailkaryawan/'+data.id_user}><button className="btn btn-primary btn-sm m-1">Detail</button> </Link>
           <button className="btn btn-danger btn-sm m-1" onClick={()=> this.deleteKaryawan(data.id_user, data.username)}>Delete</button> 
           <button className="btn btn-success btn-sm m-1" onClick={()=>this.toggle(data.id,data.id_user, data.nama, data.nik)} data-target='#gaji'>Add Gaji</button></td>
        </tr>)
        }

        if(this.props.jabatan.includes('Manager')){
            return (<tr>
                <td className="align-middle">{no}</td>
                <td className="align-middle">{data.nik}</td>
                <td className="align-middle">{data.email}</td>
                <td className="align-middle">{data.nama}</td>
                <td className="align-middle">{data.gender}</td>
                <td className="align-middle">{data.subDivisi}</td>
                <td className="align-middle"><button className="btn btn-primary btn-sm m-1"onClick={()=>this.toggleTugas(data.id_user,data.id, data.nama, data.nik)} data-targer='#tugas'>Tambah Tugas</button> </td>
            </tr>)
            
        }
    })
}


onSearch = () =>{
     let result = this.state.karyawan.filter(data => {
                return data.nama.toLowerCase().includes(this.search.value)
    })
    this.setState({search:result})
}

onPageChange(event) {
    this.setState({
        first: event.first,
        rows: event.rows,
        lastIndex : event.first + event.rows
    });
}


    render() {
        if(!this.props.userName){
            return <Redirect to ='/'></Redirect>
        }
        let {id, id_karyawan, nama, nik} = this.state.selectKaryawan
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                

                    <div className="form-group d-flex justify-content-end">
                    <div className="mr-auto">
                        <h4>Data Karyawan</h4>
                    </div>
                     <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="nama" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.karyawan})}}>Show All</button>
                             </div>
                </form>
                <table className=" table table-striped table-responsive-md btn-table mb-5 ">
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
                    <tbody className='text-left'style={{fontSize: 13}}>
                        {this.renderKaryawan()}
                    </tbody>
                </table>
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.karyawan.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
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
          <Button color="primary" onClick={()=> this.saveGaji(id,nama)}>Submit</Button>
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
          <Button color="primary" onClick={()=> this.postTugas(id_karyawan, nama)}>Submit</Button>
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
