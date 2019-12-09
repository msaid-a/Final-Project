import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import { Paginator } from 'primereact/paginator';
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

export class DataTugas extends Component {

    state={
        karyawan:null,
        modal : false,
        selectTugas :{id:'', title:''},
        search:[],
        show : 0,
        data : [],
        first: 0,
        rows: 6,
        lastIndex : 6
    }


    toggle  = (id, title,) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectTugas : {id, title}
        }));
    }
    toggleCancel = () =>{
        this.setState(prevState => ({
            modal : false,
        }))
      }

    getTugas = () =>{
        axios.get('/tugas/divisi/'+this.props.divisi,{
            headers:{
            keys : this.props.token
        }}).then(res => {
            this.setState({karyawan: res.data, search: res.data})
            console.log(this.state.karyawan)
        })
    }

    doneTugas = (id,title) =>{
        axios.patch('/tugas/'+id,{
            status : 'Selesai'
        },{
            headers:{
            keys : this.props.token
        }}).then(res=>{
            axios.post('/history',{
                description:'menyatakan tugas selesai pada judul ' + title,
                user_id: this.props.iD,
                divisi : this.props.divisi,
                type : "Update",
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            },{
                headers:{
                keys : this.props.token
            }}).then(res=>{
                Swal.fire(
                    'Done!',
                    '',
                    'success'
                  )   
                           
                this.getTugas()
            })
        })
    }


    revisiTugas = (id) =>{
        let revisi = this.revisi.value
        let deadline = this.deadline.value
        axios.patch('/tugas/'+id,{
            description: revisi,
            deadline,
            status:"REVISI"
        },{
            headers:{
            keys : this.props.token
        }}).then(res => {
            axios.post('/history',{
                description:'merevisi pada judul ' + this.state.selectTugas.title,
                user_id: this.props.iD,
                divisi : this.props.divisi,
                type : "Update",
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')

            },{
                headers:{
                keys : this.props.token
            }}).then(res=>{
                Swal.fire(
                    'Done!',
                    'Revisi',
                    'success'
                  )   
                this.getTugas()
                this.toggleCancel()
            })
        })
    }

    componentDidMount =() =>{
        this.getTugas()
    }

    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows,
            lastIndex : event.first + event.rows
        });
    }
    
    deleteTugas = (id, title) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete('/tugas/delete/'+ id,{
                    headers:{
                        keys : this.props.token
                }}).then(res=>{
                    axios.post('/history',{
                            description:'Telah Menghapus Tugas dengan judul ' + title,
                            user_id:this.props.iD,
                            divisi : this.props.divisi,
                            type : "Delete",
                            tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
                        },{
                            headers:{
                            keys : this.props.token
                        }}).then(res=>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                         this.getTugas()
                        })
                })
              
            }
          })
    }

    renderTugas =  (first,last) =>{
        let no = 0
        let now = new Date()
        return  this.state.search.slice(first,last).map ( data => {
            no++
            let deadline = new Date (data.deadline)
            if(now >= deadline && (data.status.toLowerCase().includes('belum') || data.status =='REVISI')){
                data.status = 'Terlambat'
                axios.patch('/tugas/'+data.id,{
                        status : 'Terlambat',
                        terlambat : 1
                    },{
                        headers:{
                        keys : this.props.token
                    }}).then(res=>{
                        axios.post('/history',{
                            description : "terlambat mengerjakan tugas dengan judul " + data.title,
                            user_id: data.id,
                            divisi : data.divisi,
                            type : "Update",
                            tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
                        },{
                            headers:{
                            keys : this.props.token
                        }})    
                    })
            }
            return (
                <div className={
                    this.state.karyawan.length  === 2 ?
                    "col-sm-12 col-md-5 mb-5 mx-auto" :
                        "col-md-4 mb-5 mx-auto"  
                } >
                            <div className="card " style={{minHeight : 350}}>
                                <div className="card-header">
                                    To : {data.nama}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text mb-3">{data.description}</p>
                                    
                                    <p className="card-text">Deadline : {moment(data.deadline).format('YYYY-MM-DD HH:mm:ss')}</p>
                                    {
                                        data.status.includes("REVISI") ?
                                          <h5 className="text-warning font-weight-bold">{data.status}</h5>
                                            : data.status.includes("Terlambat") ?
                                            <h5 className="align-middle text-danger font-weight-bold">{data.status}</h5>
                                            : data.status === "Terupload" || data.status === "Selesai" ?
                                            <h5 className="align-middle text-success font-weight-bold">{data.status}</h5>
                                            :
                                            <h5 className="">{data.status}</h5>
                        
                                    }{
                                        data.status !== "Selesai" ?
                                        <div className="mt-2">
                                            {
                                                data.status.includes('Terupload')?
                                                <a href={data.hasil} target="blank" className="btn btn-outline-dark">Download</a>
                                                :                                                 
                                                null
                                            }
                                        </div> : null
                                    }


                                     {
                    data.status == "Selesai" ?
                    <div>
                        <h4 className="mt-4"><i className="fas fa-check-square">Done</i></h4>
                        
                    </div>
                    : 
                    <div className="mt-4">
                        <button className="btn btn-dark mr-1 w-25" onClick={()=>this.doneTugas(data.id,data.title)}>Done</button>
                        <button className="btn btn-secondary w-25" onClick={()=>this.toggle(data.id,data.title)}>Revisi</button>
                        <br/>
                        <button className="btn btn-outline-dark mt-1 w-50" onClick={()=>this.deleteTugas(data.id, data.title)}>Delete</button>
                    </div>
                }
                                </div>
                            </div>
                       </div>
               
            )
        })
    }

    onSearch = () =>{
        let result = this.state.karyawan.filter(data => {
                   return data.nama.toLowerCase().includes(this.search.value.toLowerCase())
       })
       this.setState({search:result})
    }

    render() {
        if(!bcrypt.compareSync("Manager", this.props.jabatan)){
            return <Redirect to="/"></Redirect>
        }
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
          if(this.state.karyawan === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
          }
        let {id,title} = this.state.selectTugas
        return (
            <div className="container">
                 <form className="ml-auto mt-3" onClick={e => e.preventDefault()}>
                    <h4>Data Tugas</h4>
                    <div className="form-group d-flex justify-content-end">
                            <input type="text" className=""  placeholder="Search By Sender" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-dark ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-secondary ml-1" onClick={()=>{this.setState({search:this.state.karyawan})}}>Show All</button>
                             </div>
                </form>
                <div  className="row card-deck-wrapper my-5">

                        {this.renderTugas(this.state.first, this.state.lastIndex)}
                </div> 
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.search.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                    <ModalHeader toggle={this.toggleCancel}></ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="">title :</label>
                            <input type="text" className="form-control" value={'Revisi '+title} />
                            <label htmlFor="">Description:</label>
                            <textarea maxlength="250" className="form-control mt-3" rows="3" ref={input => this.revisi = input} ></textarea>
                            <label htmlFor="">Tambah Deadline</label>
                            <input type="datetime-local" className="form-control" ref={input => this.deadline = input} />

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={()=>this.revisiTugas(id)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleCancel}>Close</Button>
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
      divisi : state.auth.divisi,
      token : state.auth.token
    }
  }


export default connect(mapStateToProps)(DataTugas)