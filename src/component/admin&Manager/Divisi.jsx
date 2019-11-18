import React, { Component } from 'react'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Paginator } from 'primereact/paginator';


export class Divisi extends Component {
    
    state = {
        divisi : [],
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
        axios.post('/divisi',{
            divisi
        }).then(res =>{
            alert('Success')
            this.getDivisi()

        })

    }

    addSubDivisi = (divisi_id) =>{
        let subDivisi = this.subDivisi.value
        axios.post('/subdivisi',{
            subDivisi,divisi_id
        }).then(res=>{
            alert('success')
            this.getDivisi()
            this.toggleCancel()

        })
    }

    getDivisi = () =>{
        axios.get('/divisi')
            .then(res =>{
                this.setState({divisi : res.data})
            })
        axios.get('/subdivisi')
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

    deleteDivisi = (id) =>{
        axios.delete('/divisi/'+ id)
            .then(res=>{
                alert('success')
                this.getDivisi()
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
               <td>{no}</td>
                <td>{data.divisi}</td>
                <td className="text-left"><ul>{this.renderSubDivisi(data.divisi)}</ul></td>
                <td className="text-center ">
                    <button className="btn btn-success mr-1" onClick={()=>this.toggle(data.id,data.divisi)}>Add Subdivisi</button> 
                    <button className="btn btn-danger" onClick={()=>{this.deleteDivisi(data.id)}}>Delete</button> 
                </td>
            </tr>)
        })
    }

    render() {
        if(!this.props.iD){
            return <Redirect to="/" ></Redirect>
    
          }
        let {id, divisi} = this.state.selectDivisi
        return (
            <div className="container">
                <h1 style={{marginTop:91}}>Divisi</h1>
                  <form className="ml-auto mt-3" onSubmit={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <input type="text" className=""  placeholder="Divisi" ref={input => this.divisi = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.addDivisi}>Add Divisi</button>
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
      jabatan : state.auth.jabatan
    }
  }
export default connect(mapStateToProps)(Divisi)
