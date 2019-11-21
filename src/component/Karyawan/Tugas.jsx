import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Paginator } from 'primereact/paginator';
import moment from 'moment'

class Tugas extends Component {

    state={
        tugas:[],
        modal : false,
        selectTugas : {id: '', title :'', description: '', status:''},
        search:[],
        first: 0,
        rows: 10,
        lastIndex : 10

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
        axios.post('/tugas/uploads/'+ id,formData).then(res=>{
                axios.post('/history',{
                    user_id: this.props.iD,
                    description :'Telah menguload tugas dengan judul ' + title,
                    divisi:this.props.jabatan.split(' ')[1],
                    tanggal: moment(new Date()).format('YYYY-MM-DD HH-mm-ss') 
    
                }).then(res=>{
                    alert('success')
                    this.getTugas()
                })
            
        })
    }





    getTugas = () =>{
        axios.get('/tugas/'+this.props.iD,{
        }).then(res => {
            console.log(this.props.iD)
            this.setState({tugas: res.data.reverse(), search: res.data.reverse()})
        })
    }
 
    componentDidMount = () =>{
        this.getTugas()
    }

    rendertugas =  (first,last) =>{
            let no = 0
            let now = new Date()
            return this.state.search.slice(first,last).map(data =>{
                no++
                let deadline = new Date(data.deadline.replace(/-/g,','))
                if (now > deadline && (data.status == 'belum di kumpulkan' || data.status == 'REVISI')) {
                    data.status = 'TERLAMBAT'
                }
                return (<tr>
                    <td className="align-middle">{no}</td>
                    <td className="align-middle"><button className="btn btn-primary" onClick={()=>this.toggle(data.id,data.title,data.description)}>Lihat Tugas</button></td>
                    <td  className="align-middle">{data.pengirim}</td>
                    <td className="align-middle">{moment(data.deadline).format('YYYY-MM-DD')}</td>
                    {
                         data.status == "Selesai" ?
                         <td className="align-middle">
                             <i className="fas fa-check-square"></i>
                             <p>Done</p>
                         </td>
                         : 
                         <td className="align-middle"><button className="btn btn-success" onClick={()=>this.toggleTugas(data.id,data.title,data.description,data.status)}>Upload Tugas</button></td>

                    }
                    {
                    data.status.includes("REVISI") ?
                    <td className="align-middle text-warning font-weight-bold">{data.status}</td>
                    : data.status.includes("Terlambat") ?
                    <td className="align-middle text-danger font-weight-bold">{data.status}</td>
                    : data.status === "Terupload" || data.status === "Selesai" ?
                    <td className="align-middle text-success font-weight-bold">{data.status}</td>
                    :
                    <td className="">{data.status}</td>

                }
                </tr>)
            })
        
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
                   return data.from.toLowerCase().includes(this.search.value.toLowerCase())
       })
       this.setState({search:result})
   }

    render() {
        if(!this.props.jabatan.includes('Karyawan')){
            return <Redirect to='/'></Redirect>
        }
        if(this.state.tugas.length===0){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                <span class="sr-only">Loading...</span>
             </div>)
        }
        let {id,title, description,status} = this.state.selectTugas
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="Pengirim" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.karyawan})}}>Show All</button>
                             </div>
                </form>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table mb-5  ">
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
                        {this.rendertugas(this.state.first, this.state.lastIndex)}
                    </tbody>
                </table>
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.tugas.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'

					/>
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
      jabatan : state.auth.jabatan
    }
  }

export default connect(mapStateToProps,{})(Tugas)
