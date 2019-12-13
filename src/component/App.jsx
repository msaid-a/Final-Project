import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'


import Login from './Login'
import Register from './admin&Manager/Register'
import Navbar from './Navbar'
import './App.css'
import Footer from './Footer'
import GajiKaryawan from './admin&Manager/GajiKaryawan'
import DataTugas from './admin&Manager/DataTugas'
import History from './History'
import Karyawan from './admin&Manager/Karyawan'

import {session} from '../actions/index'
import Tugas from './Karyawan/Tugas'
import Gaji from './Karyawan/Gaji'
import Detail from './Detail'
import EditProfile from './EditProfile'
import Divisi from './admin&Manager/Divisi'
import Dasboard from './admin&Manager/Dasboard'
import DetailGaji from './DetailGaji'
import NotFound from './NotFound'

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
        <div id="App" >
            <Navbar/>
              <div id="page-wrap">
                <Switch>
                  <Route path='/'  component={Login} exact/>
                  <Route path='/history' component={History} />
                  <Route path='/datakaryawan' component={Karyawan} />               
                  <Route path='/tugas' component={Tugas} />               
                  <Route path='/gaji' component={Gaji} />               
                  <Route path='/divisi' component={Divisi} />               
                  <Route path='/dasboard' component={Dasboard} />               
                  <Route path='/detailgaji/:idgaji' component={DetailGaji} />               
                  <Route path='/editprofile/:idkaryawan' component={EditProfile} />               
                  <Route path='/detailkaryawan/:idkaryawan' component={Detail} />       
                  <Route path='*' component={NotFound} />       
                </Switch>
              <Footer></Footer>
              </div>
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
