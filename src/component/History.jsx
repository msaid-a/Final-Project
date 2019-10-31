import React, { Component } from 'react'
import axios from '../config/index'
import {connect} from 'react-redux'

export class History extends Component {
    state={
        history:[]
    }
    getHistory =() =>{
        let divisi = this.props.jabatan.split(' ')[1]
            if(this.props.userName=="admin"){
                return axios.get('/history')
                        .then(res=>{
                        this.setState({history:res.data})
                    }).catch(err => {
                        console.log(err)
                    })
           
            }
     
             axios.get('/history',{
                             params:{
                                divisi : divisi
                                }
                            })
                        .then(res=>{
                        this.setState({history:res.data})
                        console.log(this.state.history)
                    }).catch(err => {
                        console.log(err)
                    })
            
          
    }
    
    componentDidMount = () =>{
        this.getHistory()
        
  
    }

    renderHistory = () =>{
        let no = 0
        return this.state.history.map(data =>{
            no++
            return (<tr>
                <td>{no}</td>
                <td>{data.user}</td>
                <td>{data.desc}</td>
                <td>{data.date}</td>
            </tr>)
        })
    }
    
    render() {
        return (
            <div className="container">
                <form style={{marginTop:80}} className="ml-auto">
                <h1>History </h1>

                    <div className="form-group d-flex justify-content-end">

                        <label className="sr-only">Password</label>
                            <input type="text" className=""  placeholder="Search"></input>
                        <button type="submit" class="btn btn-primary ml-1">Seach</button>
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
      jabatan : state.auth.jabatan
    }
  }


export default connect(mapStateToProps)(History)
