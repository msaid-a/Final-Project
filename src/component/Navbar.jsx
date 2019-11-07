import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import {logoutData} from '../actions/index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Header extends Component {

    renderNav = () =>{
        if (this.props.jabatan == 'admin'){
            return ( <Menu>
             
                <Link to="/dasboard" className="menu-item" >
                    <span>Dasboard</span></Link>
                <Link to="/datakaryawan" className="menu-item" >
                    <span>Data Karyawan</span></Link>
                <Link to="/register" className="menu-item" >
                    <span>Tambah Karyawan</span></Link>
                <Link to="/gajikaryawan" className="menu-item" >
                    <span>Gaji Karyawan</span>
                </Link>
                <Link to="/divisi" className="menu-item" >
                    <span>Divisi</span>
                </Link>
                <Link to={"/detailkaryawan/"+this.props.iD} className="menu-item" >
                    <span>Profile</span>
                </Link>
                <Link to="/history" className="menu-item" >
                    <span>History</span>
                </Link>
                <Link onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(this.props.jabatan.includes('Manager')){
            return ( <Menu>
                <Link to="/dasboard" className="menu-item" >
                    <span>Dasboard</span></Link>
                <Link to="/datakaryawan" className="menu-item" >
                    <span>Data Karyawan</span></Link>
                    <Link to="/gaji" className="menu-item" >
                    <span>Lihat Gaji</span></Link>
                <Link to="/datatugas" className="menu-item" >
                    <span>Data Tugas</span>
                </Link>
                <Link to={"/detailkaryawan/"+this.props.iD} className="menu-item" >
                    <span>Profile</span>
                </Link>
                <Link to="/history" className="menu-item" >
                    <span>History</span>
                </Link>
                <Link onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(this.props.jabatan.includes('Karyawan')){
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
                <Link onClick={this.props.logoutData}>
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
