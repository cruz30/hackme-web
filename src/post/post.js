import React, {Component} from 'react';
import './post.css';
import Comment from '../comment/comment';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {comments:this.props.comments, showComments:false};
    this.commentList = this.commentList.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  getLikeTitle(likeCount) {
    if (likeCount === 1) {
      return '1 Like';
    }
    else {
      return `${likeCount} Likes`;
    }
  }

  commentList = () => {
    const list = this.props.comments.map((comment, index) =>
      <div className="col-sm-12" key={index}>
        <Comment author={comment.author} body={comment.body} />
      </div>
    );
    return (list);
  }

  _addComment = (author, body) => {
    const comment = {author, body};
    var self = this;
    fetch(`http://localhost:3000/v1/post/add/comment/${this.props.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `${author}`,
        body: `${body}`,
      })
    }).then(() => {
      var newComments;
      if (self.state.comments) {
        newComments = self.state.comments;
      }
      else {
        newComments = [];
      }
      newComments.push(comment);
      self.setState({ comments: newComments, showComments: true });
    }, err => {
        console.log(err);
    });
  }

  _handleSubmit(event) {
    if (event.keyCode === 13 && this._comment.value) {
      const msg = this._comment.value;
      this._comment.value = "";
      event.preventDefault();
      this._addComment("dc443y", msg);
    }
  }

  _handleClick = () => {
    this.setState({showComments: !this.state.showComments});
  }

  render() {
    let commentsPosted = "";
    if (this.state.showComments) {
      commentsPosted = this.commentList();
    }
    return (
      <div className="container postContainer">
        <img src="https://image.flaticon.com/icons/png/128/25/25634.png"
        className="userAvatar" alt="User Avatar"></img>
        <h5 className="authorContainer">{this.props.user}</h5>
        <h6 className="timeStamp">{this.props.time}</h6>
        <p className="msg">{this.props.msg}</p>
        <hr></hr>
        <div className="row">
          <div className="col-sm-2">
            <h6 className="actions">{this.getLikeTitle(this.props.likes)}</h6>
          </div>
          <div className="col-sm-2">
            <button onClick={this._handleClick.bind(this)}>Comments</button>
          </div>
        </div>
        {/* {this.commentList()} */}
        {commentsPosted}
        <textarea className="comment-container" placeholder="Write a comment..."
            ref={(textarea) => this._comment = textarea}
            onKeyDown={this._handleSubmit.bind(this)}></textarea>
      </div>
    );
  }
}

export default Post;
