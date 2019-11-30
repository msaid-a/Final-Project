import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GajiKaryawan from './GajiKaryawan'
import DataKaryawan from './DataKaryawan'
import Register from './Register'
import DataTugas from './DataTugas'


class Karyawan extends Component {

  

    render() {
        if(!this.props.userName){
            return <Redirect to ='/'></Redirect>
        }
          if(bcrypt.compareSync("Karyawan", this.props.jabatan)){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div style={{marginTop:80}} className="container">
                <Tabs>
                    {
                        bcrypt.compareSync("admin", this.props.jabatan) ?
                            <TabList>
                                <Tab>Data Karyawan</Tab>
                                <Tab>Gaji Karyawan</Tab>
                                <Tab>Tambah Karyawan</Tab>
                            </TabList>                        
                        :
                        <TabList>
                                <Tab>Data Karyawan</Tab>
                                <Tab>Data Tugas</Tab>
                            </TabList>
                    }
                    {
                        bcrypt.compareSync("admin", this.props.jabatan) ?
                        <div>
                        <TabPanel>
                            <DataKaryawan />
                        </TabPanel>
                        <TabPanel>
                          <GajiKaryawan/>
                        </TabPanel>
                        <TabPanel>
                          <Register/>
                        </TabPanel>
                        </div> :

                         <div>
                         <TabPanel>
                            <DataKaryawan />
                         </TabPanel>
                         <TabPanel>
                            <DataTugas />
                         </TabPanel>
                         </div>
                    }
   
  </Tabs>
            </div>
    //         <div className="container">
    //             
    //         </div>
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
export default connect(mapStateToProps,{})(Karyawan)
