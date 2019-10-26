import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Tugas extends Component {

    state={
        tugas:[],
        modal : false,
        selectTugas : {id: '', title :'', description: ''}

    }


    toggle  = (id, title,description) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectTugas : {id, title, description}
        }));
    }
    toggleCancel = () =>{
        this.setState(prevState => ({
            modal : false,
        }))
      }
    
      toggleTugas =  (id,title,description) => {
            this.setState(prevState => ({
                modal2: !prevState.modal,
                selectTugas : {id, title, description}

            }));

      }
    
      toggleTugasCancel = () =>{
        this.setState(prevState => ({
            modal2 : false,
        }))
    
    }



    postTugas = (id) =>{
        let hasil = this.hasil.value
        console.log(id)
        axios.patch('http://localhost:2020/tugas/'+id,{
            hasil : hasil,
            status : 'Terupload'
        }).then(res =>{
            alert('success')
            this.getTugas()
        })
    }





    getTugas = () =>{
        axios.get('http://localhost:2020/tugas',{
            params: {
                idUser : this.props.iD
            }
        }).then(res => {
            console.log(res.data)
            this.setState({tugas: res.data})
        })
    }
 
    componentDidMount = () =>{
        this.getTugas()
    }

    rendertugas = () =>{
        let no = 0
        return this.state.tugas.reverse().map(data =>{
            no++
            return (<tr>
                <td>{no}</td>
                <td><button className="btn btn-primary" onClick={()=>this.toggle(data.id,data.title,data.description)}>Lihat Tugas</button></td>
                <td>{data.from}</td>
                <td>{data.deadline}</td>
                <td><button className="btn btn-success" onClick={()=>this.toggleTugas(data.id,data.title,data.description)}>Upload Tugas</button></td>
                <td>{data.status}</td>
            </tr>)
        })
    }

    render() {
        let {id,title, description} = this.state.selectTugas
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto">
                    <div className="form-group d-flex justify-content-end">
                            <input type="text" className=""  placeholder="Search"></input>
                        <button type="submit" class="btn btn-primary ml-1">Seach</button>
                             </div>
                </form>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table ">
                    <thead style={{fontSize: 15}}  className='thead-dark' style={{height:40}}>
                    <tr>
                    <th>NO</th>
                    <th>Tugas</th>
                    <th>Pengirim</th>
                    <th>Deadline</th>
                    <th>Action</th>
                    <th>Status</th>
                    </tr>
                    </thead>
                    <tbody style={{fontSize: 15}}>
                        {this.rendertugas()}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal1">
                <ModalHeader toggle={this.toggleCancel}></ModalHeader>
        <ModalBody>
            <form >
                <label htmlFor="">title :</label>
                <input type="text" className="form-control" value={title}/>
                <label htmlFor="">Description:</label>
                <textarea className="form-control mt-3" rows="3" value={description}></textarea>
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
            <input type="text" name="" id="" placeholder="Upload Tugas" className="form-control" ref={input => {this.hasil = input}}/>
            </form>
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleTugasCancel}>Close</Button>
          <Button color="primary" onClick={() => this.postTugas(id)}>Submit</Button>
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

export default connect(mapStateToProps,{})(Tugas)
