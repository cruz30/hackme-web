import React, {Component} from 'react';
import './status.css';

class Status extends Component {
  render() {
    return (
      <div className="container">
        <form onSubmit={this._handleSubmit.bind(this)}>
          <textarea placeholder="What's on your mind?" ref={(textarea) => this._status = textarea}>
          </textarea>
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
  _handleSubmit(event) {
    event.preventDefault();
    let status = this._status;

    this.props.addStatus("dc443y", status.value, 0);
  }
}

export default Status;
