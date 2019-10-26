import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import {logoutData} from '../actions/index'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Header extends Component {

    renderNav = () =>{
        if (this.props.jabatan == 'admin'){
            return ( <Menu>
             
                <Link to="/datakaryawan" className="menu-item" >
                    <i className="fas fa-user-circle" />
                    <span>Data Karyawan</span></Link>
                <Link to="/gajikaryawan" className="menu-item" >
                    <i className="fas fa-money-bill-wave-alt" />
                    <span>Gaji Karyawan</span>
                </Link>
                <Link onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(this.props.jabatan.includes('Manager')){
            return ( <Menu>
             
                <Link to="/datakaryawan" className="menu-item" >
                    <i className="fas fa-user-circle" />
                    <span>Data Karyawan</span></Link>
                    <Link to="/gaji" className="menu-item" >
                    <i className="fas fa-user-circle" />
                    <span>Lihat Gaji</span></Link>
                <Link to="/datatugas" className="menu-item" >
                    <i className="fas fa-money-bill-wave-alt" />
                    <span>Data Tugas</span>
                </Link>
                <Link onClick={this.props.logoutData}>
                      <button className="menu-item btn btn-danger">Logout</button>
                </Link>
        </Menu>)
        }
        if(this.props.jabatan.includes('Karyawan')){
            return ( <Menu>
             
                <Link to="/gaji" className="menu-item" >
                    <i className="fas fa-user-circle" />
                    <span>Lihat Gaji</span></Link>
                <Link to="/tugas" className="menu-item" >
                    <i className="fas fa-money-bill-wave-alt" />
                    <span>Daftar Tugas</span>
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
                              <a className="navbar-brand ml-auto mt-1" href="index.html">Start Bootstrap</a>
                          {/* <li className="nav-item dropdown no-arrow">
                              <a className="nav-link dropdown-toggle mt-1" href="#" id="userDropdown" role="button"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-user-circle fa-fw " />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                  <a className="dropdown-item" href="#">Settings</a>
                                  <a className="dropdown-item" href="#">Activity Log</a>
                                  <div className="dropdown-divider" />
                                  <button className="dropdown-item text" onClick={this.props.logoutData}>Logout</button>
                              </div>
                          </li> */}
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
