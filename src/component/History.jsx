import React, { Component } from 'react'
import axios from '../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Paginator } from 'primereact/paginator';
import moment from 'moment'

export class History extends Component {
    state={
        history:[],
        cari:[],
        first: 0,
        rows: 10,
        lastIndex : 10
    }
    getHistory =() =>{
            if(this.props.jabatan==="admin"){
                return axios.get('/history')
                        .then(res=>{
                        this.setState({history:res.data,cari : res.data})
                    }).catch(err => {
                        console.log(err)
                    })
           
            }
            if(this.props.jabatan ==='Manager'){

               return axios.get('/history/' + this.props.divisi)
                           .then(res=>{
                           this.setState({history: res.data, cari : res.data})
                       }).catch(err => {
                           console.log(err)
                       })
            }
            return axios.get('/history/profile/' + this.props.userName)
            .then(res=>{
                    this.setState({history: res.data, cari : res.data})
                     }).catch(err => {
                         console.log(err)
                     })
                
            
    }
    
    componentDidMount = () =>{
        this.getHistory()
        
  
    }

    renderHistory = (first,last) =>{
        let no = 0
        
        return this.state.cari.slice(first,last).map(data =>{
            no++
            return (<tr>
                <td className="align-middle">{no}</td>
                <td className="align-middle">{data.username}</td>
                <td className="align-middle">{data.divisi}</td>
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
        let result = this.state.history.filter(data => {
            return data.username.includes(username)
       })
       this.setState({cari:result})
    }
    
    
    render() {
        if(!this.props.iD){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto " onClick={e => e.preventDefault()}>
                    <div className="form-group d-flex justify-content-end">
                    <div className="mr-auto">
                        <h3>History</h3>
                    </div>
                    <label className="h5 mt-2">search :</label>
                            <input type="text" className=""  placeholder="nama" ref={input => this.search = input}></input>
                        <button type="submit" class="btn btn-primary ml-1" onClick={this.onSearch}>Seach</button>
                        <button type="submit" class="btn btn-warning ml-1" onClick={()=>{this.setState({search:this.state.gaji})}}>Show All</button>
                             </div>
                </form>
                <table className="table table-sm table table-bordered table-striped table-responsive-md btn-table mb-5">
                    <thead style={{fontSize: 15}}  className='thead-dark' style={{height:40}}>
                    <tr>
                    <th>NO</th>
                    <th>Username</th>
                    <th>Divisi</th>
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
						totalRecords={this.state.history.length}
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
      divisi : state.auth.divisi
    }
  }


export default connect(mapStateToProps)(History)
