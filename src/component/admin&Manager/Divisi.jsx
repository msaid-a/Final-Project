import React, { Component } from 'react'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Paginator } from 'primereact/paginator';
import moment from 'moment'
import Swal from 'sweetalert2' 
import bcrypt from 'bcryptjs'

export class Divisi extends Component {
    
    state = {
        divisi : null,
        modal : false,
        selectDivisi : {id : '', divisi : ''},
        subDivisi : [],
        first: 0,
        rows: 5,
        lastIndex : 5
    }

    toggle  = (id,divisi) => {
            this.setState(prevState => ({
                modal: !prevState.modal,
                selectDivisi :{id, divisi}
            }));
        }
        
        toggleCancel  = () => {
            console.log(this.state.selectDivisi)
            this.setState(prevState => ({
                modal: !prevState.modal
            }));
}

    addDivisi = () => {
        let divisi = this.divisi.value
        if(divisi === ''){
            return Swal.fire({
                type: 'error',
                title: 'Tolong di isi',
                showConfirmButton: false,
                timer: 1500
              })
        }
        axios.post('/divisi',{
            divisi
        },{headers:{
            keys : this.props.token
        }}).then(res =>{
            if(res.data.error) return alert('Divisi Sudah Ada')
            axios.post('/history',{
                description : "telah menambahkan divisi baru yaitu " + this.divisi.value,
                user_id:this.props.iD,
                divisi : this.props.divisi,
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            },{headers:{
                keys : this.props.token
            }}).then(res=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                  })

                this.getDivisi()
            })

        })

    }

    addSubDivisi = (divisi_id) =>{
        let subDivisi = this.subDivisi.value
        axios.post('/subdivisi',{
            subDivisi,divisi_id
        },{headers:{
            keys : this.props.token
        }}).then(res=>{
            axios.post('/history',{
                description : "telah menambahkan subdivisi baru yaitu " + this.subDivisi.value,
                user_id:this.props.iD,
                divisi : this.props.divisi,
                tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
            },{headers:{
                keys : this.props.token
            }}).then(res=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.getDivisi()
                this.toggleCancel()
            })

        })
    }

    getDivisi = () =>{
        axios.get('/divisi',{
            headers:{
            keys : this.props.token
        }})
            .then(res =>{
                this.setState({divisi : res.data})
            })
        axios.get('/subdivisi',{
            headers:{
            keys : this.props.token
        }})
            .then(res => {
                this.setState({subDivisi: res.data})
            })
    }

    componentDidMount = () =>{
        this.getDivisi()
    }

    renderSubDivisi = (divisi) =>{
        let subDivisi = this.state.subDivisi.filter(data => {
            return data.divisi.includes(divisi)
        })
        return subDivisi.map(data => {
            return (<li>{data.subDivisi}</li>)
        })
    }

    deleteDivisi = (id,divisi) =>{
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
        axios.delete('/divisi/'+ id,{headers:{
            keys : this.props.token
        }})
            .then(res=>{
                axios.post('/history',{
                    description : "telah mengahpus divisi yaitu " + divisi,
                    user_id:this.props.iD,
                    divisi : this.props.divisi,
                    tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
                },{headers:{
                    keys : this.props.token
                }}).then(res=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    this.getDivisi()
                })
               
            })
        }
        })
    }
    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows,
            lastIndex : event.first + event.rows
        });
    }
    renderDivisi = (first,last) =>{
        let no = 0
       return this.state.divisi.slice(first,last).map(data =>{
           no++
           return( <tr>
               <td className="align-middle">{no}</td>
                <td className="align-middle">{data.divisi}</td>
                <td className="text-left align-middle"><ul>{this.renderSubDivisi(data.divisi)}</ul></td>
                <td className="text-center align-middle ">
                    <button className="btn btn-secondary mr-1" onClick={()=>this.toggle(data.id,data.divisi)}>Add Subdivisi</button> 
                    <button className="btn btn-outline-dark" onClick={()=>{this.deleteDivisi(data.id, data.divisi)}}>Delete</button> 
                </td>
            </tr>)
        })
    }

    render() {
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
        if(!bcrypt.compareSync("admin", this.props.jabatan)){
            return <Redirect to='/' ></Redirect>
        }
        if(this.state.divisi === null){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
          }
        let {id, divisi} = this.state.selectDivisi
        return (
            <div className="container">
                <h1 style={{marginTop:91}}>Divisi</h1>
                  <form className="ml-auto mt-3" onSubmit={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <input type="text" className=""  placeholder="Divisi" ref={input => this.divisi = input}></input>
                        <button type="submit" class="btn btn-dark ml-1" onClick={this.addDivisi}>Add Divisi</button>
                             </div>
                </form>
                <table className="table table-striped table-responsive-md btn-table mt-1" >
                    <thead>
                    <th>NO</th>
                    <th>Divisi</th>
                    <th>Sub Divisi</th>
                    <th>Action</th>
                    </thead>
                    <tbody>
                        {this.renderDivisi(this.state.first, this.state.lastIndex)}
                    </tbody>
                </table>
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.divisi.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                <ModalHeader toggle={this.toggleCancel}>{divisi}</ModalHeader>
        <ModalBody>
            <form onSubmit={e=> e.preventDefault()}>
                <input type='text' className="form-control" placeholder="Nama Pekerjaan" ref={input => this.subDivisi = input}></input>
            </form>
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleCancel}>Close</Button>
          <Button color="primary" onClick={()=> this.addSubDivisi(id)}>Submit</Button>
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
export default connect(mapStateToProps)(Divisi)
