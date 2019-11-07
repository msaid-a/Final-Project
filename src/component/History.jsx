import React, { Component } from 'react'
import axios from '../config/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


export class History extends Component {
    state={
        history:[],
        cari:[],
        show: 0
    }
    getHistory =() =>{
            if(this.props.jabatan=="admin"){
                return axios.get('/history')
                        .then(res=>{
                        this.setState({history:res.data,cari : res.data})
                    }).catch(err => {
                        console.log(err)
                    })
           
            }
     
             axios.get('/history',{
                             params:{
                                divisi : this.props.divisi
                                }
                            })
                        .then(res=>{
                        this.setState({history: res.data, cari : res.data})
                        console.log(this.state.cari)
                    }).catch(err => {
                        console.log(err)
                    })
            
          
    }
    
    componentDidMount = () =>{
        this.getHistory()
        
  
    }

    renderHistory = () =>{
        let no = 0
        let show = this.state.show
        if(!show) show = 5
        if(show=='all') show = this.state.history.length
        return this.state.cari.slice(0,show).map(data =>{
            no++
            return (<tr>
                <td>{no}</td>
                <td>{data.user}</td>
                <td>{data.desc}</td>
                <td>{data.date.slice(0,10)}</td>
            </tr>)
        })
    }

    onSearch = () =>{
        let username = this.search.value
        let result = this.state.history.filter(data => {
            return data.user.includes(username)
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
                    <label className="h5 mt-2">Show tables:</label>
                        <select  className="mr-auto" ref={input => this.show = input} onChange={() => this.setState({show:this.show.value})}>
                        <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">All</option>
                                    </select>
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
                    <th>Description</th>
                    <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                </table>
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
