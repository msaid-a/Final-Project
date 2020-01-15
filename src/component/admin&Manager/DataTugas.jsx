import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import { Paginator } from 'primereact/paginator';
import bcrypt from 'bcryptjs'

import ItemTugas from './ItemTugas'

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
    
   

    renderTugas =  (first,last) =>{
        return  this.state.search.slice(first,last).map ( data => {
            data.deadline = new Date (data.deadline)
            return <ItemTugas length={this.state.karyawan.length} divisi={data.divisi} id={data.id}  status={data.status} deadline={data.deadline} tujuan={data.nama} pengirim={data.pengirim} title={data.title} description={data.description} hasil={data.hasil} getTugas={this.getTugas} />
            
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
          if(this.state.karyawan.length === 0 ){
            return (<div style={{marginTop:80}}>
                        <h1 >Belum ada tugas yang di kirim</h1>
                        <h1 >Terimakasih!!!</h1>
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