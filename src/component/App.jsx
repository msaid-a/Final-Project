import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import './App.css'
import Footer from './Footer'
import GajiKaryawan from './GajiKaryawan'
import DataTugas from './DataTugas'
import History from './History'
import DataKaryawan from './DataKaryawan'

import {session} from '../actions/index'
import Tugas from './Tugas'
import Gaji from './Gaji'
import Detail from './Detail'
import EditProfile from './EditProfile'
import Divisi from './Divisi'

class App extends Component {

  state = {
    check : false
  }


  componentDidMount(){
    // backup user dari localstorage ke redux
    let userData = JSON.parse(localStorage.getItem('userData'))
    if (userData){
      // kirim ke redux
      console.log(userData)
      this.props.session(userData)

    }

    this.setState({check : true})
}
  render() {
    if (this.state.check === true){

    
    return (
        <BrowserRouter>
        <div id="App">
            <Navbar/>
              <div id="page-wrap">
                <Route path='/'  component={Login} exact/>
                <Route path='/register' component={Register} />
                <Route path='/gajikaryawan' component={GajiKaryawan} />
                <Route path='/datatugas' component={DataTugas} />
                <Route path='/history' component={History} />
                <Route path='/datakaryawan' component={DataKaryawan} />               
                <Route path='/tugas' component={Tugas} />               
                <Route path='/gaji' component={Gaji} />               
                <Route path='/divisi' component={Divisi} />               
                <Route path='/editprofile/:idkaryawan' component={EditProfile} />               
                <Route path='/detailkaryawan/:idkaryawan' component={Detail} />               
              </div>
              <Footer></Footer>
        </div>
        </BrowserRouter>
    )
    }
    return <h1>Loading</h1>
  }
}

export default connect(null,{session})(App)
// titik 2 pada path merupakan sebuah variable yang menyimopan data
  // data pada variable dapat berubah