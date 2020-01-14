import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'


export class ItemTugas extends Component {
    
    state ={
        modal : false,
        revisi : false,
        selectTugas: {id : '', title: ''}
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
                           
                this.props.getTugas()
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
                this.toggleCancelRevisi()
                Swal.fire(
                    'Done!',
                    'Revisi',
                    'success'
                  )   
                this.props.getTugas()
            })
        })
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
                         this.props.getTugas()
                        })
                })
              
            }
          })
    }

    

    renderData = () =>{
        let now = new Date()
        if(now >= this.props.deadline && (this.props.status.toLowerCase().includes('belum') || this.props.status =='REVISI')){
            this.props.status = 'Terlambat'
            axios.patch('/tugas/'+this.props.id,{
                    status : 'Terlambat',
                    terlambat : 1
                },{
                    headers:{
                    keys : this.props.token
                }}).then(res=>{
                    axios.post('/history',{
                        description : "terlambat mengerjakan tugas dengan judul " + this.props.title,
                        user_id: this.props.id,
                        divisi : this.props.divisi,
                        type : "Update",
                        tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
                    },{
                        headers:{
                        keys : this.props.token
                    }})    
                })
        }
        return (
          
                        <div className="card " style={{minHeight : 350}}>
                            <div className="card-header">
                                To : {this.props.tujuan}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.props.title}</h5>
                                <p className="card-text mb-3">{
                                    this.props.description.length > 65 ?
                                    this.props.description.slice(0,65)
                                    : this.props.description
                                    }<Link onClick={this.toggle} className="text-secondary">{this.props.description.length > 65 ? '...Read more' : null}</Link></p>
                                
                                <p className="card-text">Deadline : {moment(this.props.deadline).format('YYYY-MM-DD HH:mm:ss')}</p>
                                {
                                    this.props.status.includes("REVISI")?
                                      <h5 className="text-warning font-weight-bold">{this.props.status}</h5>
                                        : this.props.status.includes("Terlambat") ?
                                        <h5 className="align-middle text-danger font-weight-bold">{this.props.status}</h5>
                                        : this.props.status === "Terupload" || this.props.status === "Selesai" ?
                                        <h5 className="align-middle text-success font-weight-bold">{this.props.status}</h5>
                                        :
                                        <h5 className="">{this.props.status}</h5>
                    
                                }{
                                    this.props.status !== "Selesai" ?
                                    <div className="mt-2">
                                        {
                                            this.props.status.includes('Terupload')?
                                            <a href={this.props.hasil} target="blank" className="btn btn-outline-dark">Download</a>
                                            :                                                 
                                            null
                                        }
                                    </div> : null
                                }


                                 {
                this.props.status === "Selesai" ?
                <div>
                    <h4 className="mt-4"><i className="fas fa-check-square">Done</i></h4>
                    
                </div>
                : this.props.pengirim === this.props.userName ?
                <div className="mt-4">
                    <button className="btn btn-dark mr-1 w-25" onClick={()=>this.doneTugas(this.props.id,this.props.title)}>Done</button>
                    <button className="btn btn-secondary w-25" onClick={()=>this.toggleRevisi(this.props.id,this.props.title)}>Revisi</button>
                    <br/>
                    {
                        this.props.status.includes('Terupload') ?
                        null :
                        <button className="btn btn-outline-dark mt-1 w-50" onClick={()=>this.deleteTugas(this.props.id, this.props.title)}>Delete</button>

                    }
                </div>
                : null
            }
                            </div>
                        </div>
           
        )
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


    toggleRevisi  = (id, title,) => {
        this.setState(prevState => ({
            revisi: !prevState.modal,
            selectTugas : {id, title}
        }));
    }
    toggleCancelRevisi = () =>{
        this.setState(prevState => ({
            revisi : false,
        }))
    }

    render() {
        return (
            <div className={
                this.props.length  === 2 ?
                "col-sm-12 col-md-5 mb-5 mx-auto" :
                    "col-md-4 mb-5 mx-auto"  
            } >
                {this.renderData()}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                    <ModalHeader toggle={this.toggleCancel}>Pengirim : {this.props.pengirim}</ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="">title :</label>
                            <input type="text" className="form-control" value={this.props.title} />
                            <label htmlFor="">Description:</label>
                            <textarea maxlength="250" className="form-control mt-3" rows="3" value={this.props.description} ></textarea>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleCancel}>Close</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.revisi} toggle={this.toggleRevisi} className={this.props.className} id="modal1">
                    <ModalHeader toggle={this.toggleCancelRevisi}></ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="">title :</label>
                            <input type="text" className="form-control" value={'Revisi '+this.props.title} />
                            <label htmlFor="">Description:</label>
                            <textarea maxlength="250" className="form-control mt-3" rows="3" ref={input => this.revisi = input} ></textarea>
                            <label htmlFor="">Tambah Deadline</label>
                            <input type="datetime-local" className="form-control" ref={input => this.deadline = input} />

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={()=>this.revisiTugas(this.props.id)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleCancelRevisi}>Close</Button>
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

export default  connect(mapStateToProps)(ItemTugas)
