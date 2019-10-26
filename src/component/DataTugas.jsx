import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class DataTugas extends Component {

    state={
        karyawan:[],
        modal : false,
        selectTugas :{id:'', title:''}
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
        axios.get('http://localhost:2020/tugas',{
            params : {
                from : this.props.userName
            }
        }).then(res => {
            this.setState({karyawan: res.data})
        })
    }

    doneTugas = (id) =>{
        axios.patch('http://localhost:2020/tugas/'+id,{
            status : 'Selesai'
        }).then(res=>{
            alert('Sucess')
            this.getTugas()
        })
    }


    revisiTugas = (id) =>{
        let revisi = this.revisi.value
        let deadline = this.deadline.value
        axios.patch('http://localhost:2020/tugas/'+id,{
            description: revisi,
            deadline,
            status:"REVISI"
        }).then(res => {
            alert('success')
            this.getTugas()
            this.toggleCancel()
        })
    }

    componentDidMount =() =>{
        this.getTugas()
    }

    renderTugas = () =>{
        let no = 0
        return this.state.karyawan.map(data => {
            no++
            return (<tr>
                <td>{no}</td>
                <td>{data.namaUser}</td>
                <td>{data.title}</td>
                <td>{data.deadline}</td>
                <td><a href={data.hasil} className="btn btn-warning"> Download Hasil </a></td>
                <td><button className="btn btn-success mr-1" onClick={()=>this.doneTugas(data.id)}>Done</button>
                    <button className="btn btn-danger" onClick={()=>this.toggle(data.id,data.title)}>Revisi</button></td>
                <td>{data.status}</td>
            </tr>)
        })
    }

    render() {
        let {id,title} = this.state.selectTugas
        return (
            <div className="container">
                <table className="table table-striped table-responsive-md btn-table " style={{marginTop:91}}>
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
                        {this.renderTugas()}
                    </tbody>
                </table>
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