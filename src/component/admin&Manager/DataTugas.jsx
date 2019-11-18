import React, { Component } from 'react'
import axios from '../../config/index'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import { Paginator } from 'primereact/paginator';

export class DataTugas extends Component {

    state={
        karyawan:[],
        modal : false,
        selectTugas :{id:'', title:''},
        search:[],
        show : 0,
        data : [],
        first: 0,
        rows: 10,
        lastIndex : 10
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
        axios.get('/tugas',{
            
        }).then(res => {
            this.setState({karyawan: res.data.reverse(), search: res.data.reverse()})
            console.log(this.state.karyawan)
        })
    }

    doneTugas = (id,title) =>{
        axios.patch('/tugas/'+id,{
            status : 'Selesai'
        }).then(res=>{
            axios.post('/history',{
                user:this.props.userName,
                desc:'menyatakan tugas selesai pada judul ' + title,
                divisi: this.props.divisi,
                date: new Date() 
            }).then(res=>{
                alert('success')            
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
        }).then(res => {
            axios.post('/history',{
                user:this.props.userName,
                desc:'merevisi pada judul ' + this.state.selectTugas.title,
                divisi: this.props.divisi, 
                date: new Date() 

            }).then(res=>{
                alert('success')            
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
    

    renderTugas =  (first,last) =>{
        let no = 0
        let now = new Date()
        return  this.state.search.slice(first,last).map ( data => {
            no++
            let deadline = new Date (data.deadline)
            if(now > deadline && (data.status.toLowerCase().includes('belum') || data.status =='REVISI')){
                data.status = 'Terlambat'
                axios.patch('/tugas/'+data.id,{
                        status : 'Terlambat'
                    })
            }
            return (<tr>
                <td>{no}</td>
                <td>{data.nama}</td>
                <td>{data.title}</td>
                <td>{moment(data.deadline).format('YYYY-MM-DD')}</td>
                <td><a href={'http://localhost:2020/download/'+data.hasil} target='blank' className="btn btn-warning"> Download Hasil </a></td>
                <td><button className="btn btn-success mr-1" onClick={()=>this.doneTugas(data.id,data.title)}>Done</button>
                    <button className="btn btn-danger" onClick={()=>this.toggle(data.id,data.title)}>Revisi</button></td>
                <td>{data.status}</td>
            </tr>)
        })
    }

    onSearch = () =>{
        let result = this.state.karyawan.filter(data => {
                   return data.nama.toLowerCase().includes(this.search.value.toLowerCase())
       })
       this.setState({search:result})
    }

    render() {
        if(!this.props.jabatan.includes('Manager')){
            return <Redirect to="/"></Redirect>
        }
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
        let {id,title} = this.state.selectTugas
        return (
            <div className="container">
                 <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                    <h4>Data Tugas</h4>
                    <div className="form-group d-flex justify-content-end">
                    <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="nama" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.karyawan})}}>Show All</button>
                             </div>
                </form>
                <table className="table table-striped table-responsive-md btn-table mt-5" >
                    <thead>
                    <th>NO</th>
                    <th>Karyawan</th>
                    <th>Title Tugas</th>
                    <th>Deadline</th>
                    <th>Hasil</th>
                    <th>Action</th>
                    <th>Status</th>
                    </thead>
                    <tbody>
                        {this.renderTugas(this.state.first, this.state.lastIndex)}
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
                    <ModalHeader toggle={this.toggleCancel}></ModalHeader>
                    <ModalBody>
                        <form>
                            <label htmlFor="">title :</label>
                            <input type="text" className="form-control" value={'Revisi '+title} />
                            <label htmlFor="">Description:</label>
                            <textarea className="form-control mt-3" rows="3" ref={input => this.revisi = input} ></textarea>
                            <label htmlFor="">Tambah Deadline</label>
                            <input type="date" className="form-control" ref={input => this.deadline = input} />

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
      jabatan : state.auth.jabatan
    }
  }


export default connect(mapStateToProps)(DataTugas)