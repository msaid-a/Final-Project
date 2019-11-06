import React, { Component } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
import {Redirect} from 'react-router-dom'

import {sendData} from '../actions/index'
import { connect } from 'react-redux'


export class Login extends Component {
  
  onLogin = () =>{
    let username = this.username.value
    let password = this.password.value
    this.props.sendData(username,password)
  }

    render() {
    if(this.props.jabatan === 'admin'){
      return <Redirect to ='/datakaryawan'></Redirect>
    }
    if(this.props.jabatan.split(' ')[0] === 'Manager'){
      return <Redirect to ='/datakaryawan'></Redirect>
    }
    if(this.props.jabatan.split(' ')[0] === 'Karyawan'){
      return <Redirect to ='/tugas'></Redirect>
    }
        return (
        <Container className=" border col-5 mb-1" style={{marginTop : 100}}>
        <h2 className="mt-5">Sign In</h2>
        <form className="form" onSubmit={e => e.preventDefault()}>
          <Col>
            <FormGroup className="text-left ">
              <Label>Username / Email</Label>
              <input
                type="text"
                placeholder="Username/myemail@email.com"
                className="form-control"
                ref = {input => this.username = input}
              />
            </FormGroup>
          </Col>
          <Col>
          <FormGroup className="text-left ">
              <Label>Password</Label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="form-control"
                ref={input => this.password = input}
              />
            </FormGroup>
          <button className="btn btn-secondary mt-5 mb-5" onClick={this.onLogin}>Login</button>
          </Col>
        </form>
      </Container>

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
export default connect(mapStateToProps, {sendData})(Login)