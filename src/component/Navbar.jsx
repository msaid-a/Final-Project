import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import {logoutData} from '../actions/index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const bcrypt = require('bcryptjs')

class Header extends Component {

    renderNav = () =>{
        if (bcrypt.compareSync("admin", this.props.jabatan)){
            return ( <Menu>
             
                <Link to="/dasboard" className="menu-item" >
                    <span>Dasboard</span></Link>
                <Link to="/datakaryawan" className="menu-item" >
                    <span>Data Karyawan</span></Link>
                <Link to="/divisi" className="menu-item" >
                    <span>Divisi</span>
                </Link>
                <Link to={"/detailkaryawan/"+this.props.iD} className="menu-item" >
                    <span>Profile</span>
                </Link>
                <Link to="/history" className="menu-item" >
                    <span>History</span>
                </Link>
                <Link style={{marginTop:'40vh'}} onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(bcrypt.compareSync("Manager", this.props.jabatan)){
            return ( <Menu>
                <Link to="/dasboard" className="menu-item" >
                    <span>Dasboard</span></Link>
                <Link to="/datakaryawan" className="menu-item" >
                    <span>Data Karyawan</span></Link>
                    <Link to="/gaji" className="menu-item" >
                    <span>Lihat Gaji</span></Link>
                <Link to={"/detailkaryawan/"+this.props.iD} className="menu-item" >
                    <span>Profile</span>
                </Link>
                <Link to="/history" className="menu-item" >
                    <span>History</span>
                </Link>
                <Link style={{marginTop:'45vh'}} onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(bcrypt.compareSync("Karyawan", this.props.jabatan)){
            return ( <Menu>
             
                <Link to="/gaji" className="menu-item" >
                    <span>Lihat Gaji</span></Link>
                <Link to="/tugas" className="menu-item" >
                    <span>Daftar Tugas</span>
                </Link>
                <Link to={"/detailkaryawan/"+this.props.iD} className="menu-item" >
                    <span>Profile</span>
                </Link>
                <Link to="/history" className="menu-item" >
                    <span>History</span>
                </Link>
                <Link style={{marginTop:'55vh'}} onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
    }
   
    render() {
    
            return (
                <div>
                  
                  <nav className="navbar-expand fixed-top navbar-dark bg-dark static-top" style={{height:50}} >
                    {this.renderNav()}
                    <h3 className="float-right mr-3 text-white mt-2">Work Manage</h3>
                      {/* Navbar */}
                      <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        
                      </ul>
                      
                  </nav>
    
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

export default connect(mapStateToProps,{logoutData})(Header)
