import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Paginator } from 'primereact/paginator';
import moment from 'moment'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'

class Tugas extends Component {

    state={
        tugas:null,
        modal : false,
        selectTugas : {id: '', title :'', description: '', status:''},
        search:null,
        first: 0,
        rows: 6,
        lastIndex : 6

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
        if(_status == 'REVISI'){
            status = 'REVISI Terupload'
        }else if(_status =="Terlambat"){
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
                    this.getTugas()
                    this.toggleTugasCancel()
                })
            
        })
    }





    getTugas = () =>{
        axios.get('/tugas/'+this.props.iD,{
            headers:{
            keys : this.props.token
        }}).then(res => {
            this.setState({tugas: res.data, search: res.data})
        })
    }
 
    componentDidMount = () =>{
        this.getTugas()
    }

    rendertugas =  (first,last) =>{
        if(this.state.search){
            let no = 0
            let now = new Date()
            return this.state.search.slice(first,last).map(data =>{
                no++
                let deadline = new Date(data.deadline.replace(/-/g,','))
                if (now > deadline && (data.status == 'belum di kumpulkan' || data.status == 'REVISI')) {
                    data.status = 'TERLAMBAT'
                }
                return(
                    <div className={
                        this.state.tugas.length  <= 2 ?
                        "col-sm-12 col-md-5 mb-5 mx-auto" :
                        "col-md-4 mb-5 mx-auto" 
                    }  style={{ minWidth:300}}>
                                <div className="card " style={{minHeight : 350,}}>
                                    <div className="card-header">
                                        From : {data.pengirim}
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
                            
                                        }
                                        {
                                            data.status == "Selesai" ?
                                                     <div>
                                                         <h4><i className="fas fa-check-square">Done</i></h4>
                                                     </div>
                                                     : 
                                                   <button className="btn btn-outline-dark" onClick={()=>this.toggleTugas(data.id,data.title,data.description,data.status)}>Upload Tugas</button>
                                        }
                                    </div>
                                </div>
                           </div>
                )
            })
        }
            
        
    }

    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows,
            lastIndex : event.first + event.rows
        });
    }

    onSearch = () =>{
        let result = this.state.tugas.filter(data => {
                   return data.pengirim.toLowerCase().includes(this.search.value.toLowerCase())
       })
       this.setState({search:result})
   }

    render() {
        if(!bcrypt.compareSync("Karyawan", this.props.jabatan)){
            return <Redirect to='/'></Redirect>
        }
        if(this.state.tugas === null && this.state.search === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
          }
        let {id,title, description,status} = this.state.selectTugas
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                            <input type="text" className=""  placeholder="Search By Sender" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-dark ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-secondary ml-1" onClick={()=>{this.setState({search:this.state.tugas})}}>Show All</button>
                             </div>
                </form>
                <div  className="row card-deck-wrapper my-5">
                    {this.rendertugas(this.state.first, this.state.lastIndex)}

                </div>

                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.search.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
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
export default connect(mapStateToProps,{})(Tugas)
