import React, { Component } from 'react';
import './App.css';
//import HttpService from '../services/http-service';
import NavBar from '../navbar/navbar';
// import Post from '../post/post';
// import Status from '../status/status';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignIn from '../signin/signin';
import Home from '../home/home';

//const http = new HttpService();

class App extends Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {posts:[]};
  //   this.loadData = this.loadData.bind(this);
  //   this.postList = this.postList.bind(this);
  //
  //   this.loadData();
  // }
  //
  // loadData = () => {
  //   var self = this;
  //   http.getPosts().then(data => {
  //     self.setState({posts: data})
  //   }, err => {
  //
  //   });
  // }

  // postList = () => {
  //   const list = this.state.posts.map((post) =>
  //     <div className="col-sm-12" key={post._id}>
  //       <Post user={post.user} msg={post.msg} likes={post.likes}
  //         time={post.timeStamp} comments={post.comments} id={post._id}/>
  //     </div>
  //   );
  //   return (list);
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    )
  }

  // _addStatus(user, msg, likes) {
  //   const status = {
  //     user,
  //     msg,
  //     likes
  //   };
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
  //   console.log(self.state.posts);
  //   self.setState({ posts: self.state.posts.concat([status]) });
  // }
}

export default App;
