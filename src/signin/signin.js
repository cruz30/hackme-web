import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './signin.css';
import User from '../user/user';

let user = new User();

class SignIn extends Component {

    constructor(props) {
      super(props);

      this.state = {redirect:false, register:false, auth:false, back:false};
    }

    _signIn = () => {
      var usr = document.getElementById('usr').value;
      var pwd = document.getElementById('pwd').value;
      var self = this;
      console.log('post id:' + self.props.id);
      fetch(`http://localhost:3000/v1/account/login/${usr}&${pwd}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
      }).then((res) => res.json())
        .then((resJson) => {
          console.log('res user: ' + resJson.userName);
          console.log('res pwd:' + resJson.password);
          user.setUsr(resJson.userName);
          user.setPwd(resJson.password);
          this.setState({redirect: true})
        })
        .catch((err) => {
          console.log(err);
        })
    }

    _signUp = () => {
      var usr = document.getElementById('usr').value;
      var pwd = document.getElementById('pwd').value;
      var confPwd = document.getElementById('conf-pwd').value;
      if (pwd !== confPwd) {
        alert("Your password did not match the confirmation password");
      }
      else {
        var self = this;
        fetch('http://localhost:3000/v1/account/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: `${usr}`,
            password: `${pwd}`
          })
        }).then((res) => res.json())
          .then((resJson) => {
            if (!resJson.message) {
              user.setUsr(resJson.userName);
              user.setPwd(resJson.password);
              this.setState({redirect: true})
            }
            else {
              alert("This account already exists");
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    _register = () => {
      this.setState({auth: false, register: true, back: false});
    }

    _auth = () => {
      this.setState({auth: true, register: false, back: false});
    }

    _back = () => {
      this.setState({back: true});
    }

    render(){
        if (this.state.redirect && !this.state.back) {
          return <Redirect to='/home/'/>;
        }
        else if (this.state.register && !this.state.back) {
          return (
            <div className="container modal-content">
              <div className="form-group">
                <label htmlFor="usr">User Name:</label>
                <input type="text" className="form-control" id="usr"></input>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd"></input>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Confirm Password:</label>
                <input type="password" className="form-control" id="conf-pwd"></input>
              </div>
              <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._signUp.bind(this)}>Sign Up</button>
              <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._back.bind(this)}>Back</button>
            </div>
          );
        }
        else if (this.state.auth && !this.state.back) {
          return (
            <div className="container modal-content">
              <div className="form-group">
                <label htmlFor="usr">User Name:</label>
                <input type="text" className="form-control" id="usr"></input>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd"></input>
              </div>
              <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._signIn.bind(this)}>Sign In</button>
              <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._back.bind(this)}>Back</button>
            </div>
          );
        }
        return (
          <div className="jumbotron container">
            <h1>Hello, hackers!</h1>
            <p>Lets see what kind of hacking skills you have! Find all the exploits if you can!</p>

            <button type="button" className="btn btn-danger btn-lg" data-toggle="modal" data-target=".bs-example-modal-sm">Start</button>

            <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
              <div className="modal-dialog modal-sm" role="document">
                <div className="container modal-content">
                  <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._auth.bind(this)}>Sign In</button>
                  <button className="btn btn-sm btn-danger" data-dismiss="modal" onClick={this._register.bind(this)}>Sign Up</button>
                </div>
              </div>
            </div>

          </div>
        );
    }
}

export default SignIn;
