import React, {Component} from 'react';
import './comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="container">
        <img src="https://image.flaticon.com/icons/png/128/25/25634.png"
        className="comment-avatar" alt="User Avatar"></img>
        <p>{this.props.author} {this.props.body}</p>
      </div>
    );
  }
}

export default Comment;
