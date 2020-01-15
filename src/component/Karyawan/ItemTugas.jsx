import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'
import Swal from 'sweetalert2'


export class ItemTugas extends Component {
    
    state ={
        modal : false,
        modal2 : false,
        selectTugas: {id : '', title: ''}
    }

    toggleTugas =  (id,title,description,status) => {
        this.setState(prevState => ({
            modal2: !prevState.modal,
            selectTugas : {id, title, description,status}

        }));

  }

  toggleTugasCancel = () =>{
    this.setState(prevState => ({
        modal2 : false,
    }))

}



postTugas = (id,_status,title) =>{
    let formData = new FormData()
    let hasil = this.hasil.files[0]
        formData.append("hasil",hasil)
    let status = 'Terupload'
    if(_status === 'REVISI'){
        status = 'REVISI Terupload'
    }else if(_status ==="Terlambat"){
        status = 'Terupload(Terlambat)'
    }
    formData.append("status",status)
    axios.post('/tugas/uploads/'+ id,formData,{
        headers:{
        keys : this.props.token
    }}).then(res=>{
            axios.post('/history',{
                user_id: this.props.iD,
                description :'Telah menguload tugas dengan judul ' + title,
                divisi: this.props.divisi,
                type : "Input",
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss') 

            },{
                headers:{
                keys : this.props.token
            }}).then(res=>{
                console.log(res.data)
                Swal.fire(
                    'Added!',
                    '',
                    'success'
                  )   
                this.props.getTugas()
                this.toggleTugasCancel()
            })
        
    })
}

  
    
    

    renderData = () =>{
        let now = new Date()
        if(now >= this.props.deadline && (this.props.status.toLowerCase().includes('belum') || this.props.status ==='REVISI')){
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
          
                        <div className="card " style={{minHeight : 360}}>
                            <div className="card-header">
                                Sender : {this.props.pengirim}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.props.title}</h5>
                                <p className="card-text mb-3">{
                                    this.props.description.length > 65 ?
                                    this.props.description.slice(0,65)
                                    : this.props.description
                                    }<span style={{cursor : "pointer"}} onClick={this.toggle} className="text-secondary">{this.props.description.length > 65 ? '...Read more' : null}</span></p>
                                
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
                    
                                } {
                                    this.props.status === "Selesai" ?
                                             <div>
                                                 <h4><i className="fas fa-check-square">Done</i></h4>
                                             </div>
                                             : 
                                           <button className="btn btn-outline-dark" onClick={()=>this.toggleTugas(this.props.id,this.props.title,this.props.description,this.props.status)}>Upload Tugas</button>
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

    render() {
        let {id,title,status} = this.state.selectTugas
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
                            <input disabled type="text" className="form-control" value={this.props.title} />
                            <label htmlFor="">Description:</label>
                            <textarea disabled maxlength="250" className="form-control mt-3" rows="3" value={this.props.description} ></textarea>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleCancel}>Close</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modal2} toggle={this.toggleTugas} fullHeight position="right" id='tugas'>
        <ModalHeader toggle={this.toggleTugasCancel}></ModalHeader>
        <ModalBody>
            <form onSubmit={e=> e.preventDefault()}>
            <label htmlFor="">Upload Max 200Mb (.zip/.rar/.dock/.xlsx/.pptx/.pdf)</label>
            <input type="file" name="" id="" placeholder="Upload Tugas" className="form-control h-100" ref={input => {this.hasil = input}}/>
            </form>
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleTugasCancel}>Close</Button>
          <Button color="primary" onClick={() => this.postTugas(id,status,title)}>Submit</Button>
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
