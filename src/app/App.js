import React, { Component } from 'react';
import './App.css';
import HttpService from '../services/http-service';
import Post from '../post/post';
import Status from '../status/status';

import {Router, Route} from 'react-router';
import SignIn from '../signin/signin';

const http = new HttpService();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {posts:[]};
    this.loadData = this.loadData.bind(this);
    this.postList = this.postList.bind(this);

    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getPosts().then(data => {
      self.setState({posts: data})
    }, err => {

    });
  }

  postList = () => {
    const list = this.state.posts.map((post) =>
      <div className="col-sm-12" key={post._id}>
        <Post user={post.user} msg={post.msg} likes={post.likes}
          time={post.timeStamp} comments={post.comments} id={post._id}/>
      </div>
    );
    return (list);
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right"
            type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <img className="iu-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEWZAAD///+TAADfrKy2Wlr57OyWAADnycmmIiKeIiK7YmK4cHCnGhr16enszMzTp6f8+fnNgoLhtrbUk5O+Xl7EbW2dHByuSEjr0dGiAACvTU2PAADdpqbv29vs09OsQkLlvLyoOTmoMjKuUFDFgoK9V1e3S0ueDQ3PoKCcExOlKyv24+Osw2pdAAACoUlEQVR4nO3d627aQBBAYSBmXWhDXdqCAzEJpmnS8P7v1yDZVCrZaKZl9hLO+b2G+cTFGEv2YEBERERERERERERERJfer4mmRexx9Y2+DjXVo9gDq1MKS4TphRBh+iFEmH4IL044y0/opp+7nhqvq3rqF/1wsQf+h1zX6MorHK/7RbGH/a/eEub33nwthPmHMP8QptUHeY/9NiLho+KRLYGLupRW/+z34hKhe1A8suU/jxPvrKd9Uwm/Kx55ghAhQoQIESJEiPDNFptZl/f/s3G3QP27tNtu7Fvb9E+9MT0jPupb+Qa5XXcrjn+fiY4tXLfV+ta3dnV8bkvgnwrfIFcnA6iOD/2LizCwYwhFQyNEaBpC0dAIEZqGUDQ0QoSmIRQNjRChaQhFQyNEaBpC0dAIEZqGUDQ0QoSmIRQNjRChaQhFQyNEaBpC0dAIEZqGUDQ0QoSmIRQNjRChaQhFQyNEaBpC0dAIEZqGUDQ0QoSmIRQNjRChaQhFQ1+CcC1fnIxwfvPpr27mfqFicTLC6vqkyiscKhYnIzQLIUKECBEiRIjw/LV1YGDZBha67SwscBv8kt9uWYYELiNc09ytwr1Ry1WUi7a7XShiHQd4eBU3QYCbWMAX4p3/tgfnq7mLeF8B9+y9gNzZ2j9HvXGCa62J123kO0O4dm8K3McGHvaLlp/FJsZ+8IRY2BGbIgHg4Y4yVsRmmgTQjpgM8EC0+LrZp/EW7dqdf6cxjvdL5tWWU2+F/yCkevBvlsK3qDDVuacsU50/zDKE+Ycw/xDmH8L8Q5h/CPMPYf69X+F7v+Ox+zKs+rzC45LhPL9X80WoCWGCIUSYfggRph9ChOmHEGH6KYX3+QkH24+adlkeA6uKPS0REREREREREREREZF5vwEYp11BfSHcJQAAAABJRU5ErkJggg==" alt="User Avatar"></img>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link nav-right" href="#">Daniel</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link nav-right" href="#">Home</a>
              </li>
            </ul>
          </div>
        </nav>
        <Status addStatus={this._addStatus.bind(this)}/>
        <div className="App-main">
          {this.postList()}
        </div>
      </div>
    );
  }

  _addStatus(user, msg, likes) {
    const status = {
      user,
      msg,
      likes
    };
    fetch('http://localhost:3000/v1/post/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: `${user}`,
        msg: `${msg}`,
        likes: 0
      })
    });
    var self = this;
    console.log(self.state.posts);
    self.setState({ posts: self.state.posts.concat([status]) });
  }
}

export default App;
