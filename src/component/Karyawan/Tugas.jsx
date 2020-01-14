import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from '../../config/index'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Paginator } from 'primereact/paginator';
import moment from 'moment'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'
import ItemTugas from './ItemTugas'

class Tugas extends Component {

    state={
        tugas:null,
        modal : false,
        search:null,
        first: 0,
        rows: 6,
        lastIndex : 6

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
            return this.state.search.slice(first,last).map(data =>{
                data.deadline = new Date (data.deadline)
                no++
                return <ItemTugas length={this.state.tugas.length} divisi={data.divisi} id={data.id} nomor={no} status={data.status} deadline={data.deadline} sender={data.pengirim} pengirim={data.pengirim} title={data.title} description={data.description} hasil={data.hasil} getTugas={this.getTugas} />
                
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
