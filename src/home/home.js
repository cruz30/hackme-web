import React, { Component } from 'react';
import './home.css';
import HttpService from '../services/http-service';
import NavBar from '../navbar/navbar';
import Post from '../post/post';
import Status from '../status/status';
import User from '../user/user';

let user = new User();
const http = new HttpService();

class Home extends Component {

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
      console.log('data: ' + data);
      self.setState({posts: data})
    }, err => {

    });
  }

  postList = () => {
    console.log('posts :' + this.state.posts);
    console.log('post length: ' + this.state.posts.length);
    const list = this.state.posts.map((post, index) =>
      <div className="col-sm-12" key={index}>
        <Post user={post.user} msg={post.msg} likes={post.likes}
          time={post.timeStamp} comments={post.comments} id={post._id}/>
      </div>
    );
    console.log('list: ' + list);
    console.log('list length: ' + list.length);
    return (list);
  }

  render() {
    return (
      <div className="App">
        <NavBar user={user.getUsr()}/>
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
    var self = this;
  //   fetch('http://localhost:3000/v1/post/add', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user: `${user}`,
  //       msg: `${msg}`,
  //       likes: 0
  //     })
  //   });
  //   var self = this;
  //   self.setState({ posts: self.state.posts.concat([status]) });
  //   console.log('post list: ' + self.state.posts.length);
  // }
    fetch(`http://localhost:3000/v1/post/add`, {
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
    }).then(() => {
      var newPosts;
      //if (self.state.posts) {
        newPosts = self.state.posts;
      // }
      // else {
      //   newPosts = [];
      // }
      newPosts.push(status);
      self.setState({ posts: newPosts});
      console.log('posts: ' + self.state.posts);
      console.log('posts length: ' + self.state.posts.length);
    }, err => {
        console.log(err);
    });
  }
}

export default Home;
