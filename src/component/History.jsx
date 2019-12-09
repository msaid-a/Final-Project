import React, { Component } from 'react'
import axios from '../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Paginator } from 'primereact/paginator';
import moment from 'moment'
import bcrypt from 'bcryptjs'
export class History extends Component {
    state={
        history:null,
        cari:[],
        divisi: null,
        first: 0,
        rows: 10,
        lastIndex : 10
    }
    getHistory =() =>{
            if(bcrypt.compareSync("admin", this.props.jabatan)){
                return axios.get('/history',{
                    headers:{
                    keys : this.props.token
                }})
                        .then(res=>{
                        this.setState({history:res.data,cari : res.data})
                    }).catch(err => {
                        console.log(err)
                    })
           
            }
            if(bcrypt.compareSync("Manager", this.props.jabatan)){

               return axios.get('/history/' + this.props.divisi,{
                headers:{
                keys : this.props.token
            }})
                           .then(res=>{
                           this.setState({history: res.data, cari : res.data})
                       }).catch(err => {
                           console.log(err)
                       })
            }
            return axios.get('/history/profile/' + this.props.userName,{
                headers:{
                keys : this.props.token
            }})
            .then(res=>{
                    this.setState({history: res.data, cari : res.data})
                     }).catch(err => {
                         console.log(err)
                     })
                
            
    }

    getDivisi = () =>{
        axios.get('/divisi',{
            headers :{
                keys : this.props.token
            }
        })
            .then(res=>{
                this.setState({divisi : res.data})
            })
    }
    
    componentDidMount = () =>{
        this.getHistory()
        this.getDivisi()
  
    }

    renderHistory = (first,last) =>{
        let no = 0
        return this.state.cari.slice(first,last).map(data =>{
            no++
            return (<tr>
                <td className="align-middle">{no}</td>
                <td className="align-middle">{data.username}</td>
                <td className="align-middle">{data.divisi}</td>
                <td className="align-middle">{data.type}</td>
                <td className="align-middle">{data.description}</td>
                <td className="align-middle">{moment(data.tanggal).format('YYYY-MM-DD')}</td>
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
        let username = this.search.value
        let type = this.type.value
        let bagian = this.bagian.value
        let divisi = this.divisi === undefined ? '' : this.divisi.value
        let result = this.state.history.filter(data => {
            if(!type && !bagian && !divisi){
                return data.username.includes(username)
            } 
            if(!username && !bagian && !divisi){
                return data.type.includes(type)
            }
            if(!type && !username && !divisi){
                if(bagian === "tugas"){
                    return data.description.includes('tugas') || data.description.includes('judul')
                } 
                return data.description.includes(bagian)
            }
            if(!type && !bagian && !username){
                return data.divisi.includes(divisi)
            }
            if(!type && !bagian){
                return data.divisi.includes(divisi) && data.username.includes(username)
            }
            if(!type && !username){
                if(bagian === "tugas"){
                    return (data.description.includes('tugas') || data.description.includes('judul')) && data.divisi.includes(divisi)
                } 
                return data.description.includes(bagian) && data.divisi.includes(divisi)
            }
            if(!type && !divisi){
                if(bagian === "tugas"){
                    return (data.description.includes('tugas') || data.description.includes('judul')) && data.username.includes(username)
                } 
                return data.description.includes(bagian) && data.username.includes(username)
            }
            if(!username && !divisi){
                if(bagian === "tugas"){
                    return (data.description.includes('tugas') || data.description.includes('judul')) && data.type.includes(type)
                } 
                return data.description.includes(bagian) && data.type.includes(type)
            }
            if(!username && !bagian){
                return data.type.includes(type) && data.divisi.includes(divisi)
            }else{
                if(bagian === "tugas"){
                    return (data.description.includes('tugas') || data.description.includes('judul')) && data.type.includes(type) && data.divisi.includes(divisi)
                } 
                return data.description.includes(bagian) && data.type.includes(type) && data.divisi.includes(divisi) && data.username.includes(username)
            }

       })
       this.setState({cari:result})
    }
    
    
    render() {
        if(!this.props.iD){
            return <Redirect to="/"></Redirect>
        }
        if(this.state.history === null ){
            return (<div class="spinner-border mx-auto" style={{marginTop:'50vh'}} role="status">
                         <span class="sr-only">Loading...</span>
                    </div>)
          }
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e=> e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <div>
                        <select onChange={this.onSearch} className={
                            bcrypt.compareSync("admin", this.props.jabatan) ?
                            "custom-select col-3":
                            "custom-select col-5"
                            
                            } ref={input => this.type = input}>
                            <option value="" hidden>Type</option>
                            <option value="Input">Input</option>
                            <option value="Update">Update</option>
                            <option value="Delete">Delete</option>
                        </select>
                        <select onChange={this.onSearch}  className={
                            bcrypt.compareSync("admin", this.props.jabatan) ?
                            "ml-1 custom-select col-3":
                            "ml-1 custom-select col-5"
                            
                            } ref={input => this.bagian = input}>
                            <option value="" hidden>bagian</option>
                            <option value="tugas">Tugas</option>
                            <option value="karyawan">Karyawan</option>
                            <option value="divisi">Divisi</option>
                            <option value="gaji">Gaji</option>
                        </select>
                        {
                            bcrypt.compareSync("admin", this.props.jabatan) ?
                            <select onChange={this.onSearch} className="ml-1 custom-select col-4" ref={input => this.divisi = input}>
                            <option value="" hidden>divisi</option>
                                {
                                        this.state.divisi !== null ?
                                        this.state.divisi.map(data => {
                                        return <option>{data.divisi}</option>
                                        }) : <option value="" hidden>divisi</option>

                                }
                            </select>
                            : null

                        }
                        
                    </div>
                        <div className="mr-auto">
                        </div>
                        <input type="text" className="" placeholder="Search By Name" ref={input=> this.search =
                        input}></input>
                        <button type="submit" class="btn btn-dark ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-secondary ml-1"
                            onClick={()=>{this.setState({cari:this.state.history})}}>Show All</button>
                    </div>
                </form>
      <div className="card">
          <div className="card-header text-left">
              History
          </div>
          <div className="card-body">
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table mb-5 bg-white">
                    <thead style={{fontSize: 15}}  className='' style={{height:40}}>
                    <tr>
                    <th>NO</th>
                    <th>Username</th>
                    <th>Divisi</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory(this.state.first, this.state.lastIndex)}
                    </tbody>
                </table>
                <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.cari.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
					/>
          </div>
      </div>

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

export default connect(mapStateToProps)(History)
