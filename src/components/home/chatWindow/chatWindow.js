//list of messgaes
// right and left align based on recivever and sendder id.
// chat box in the bottom

import React from "react";
import { TextField } from "@material-ui/core";
import "./chatWindow.css";
import { withFirebase } from "../../firebase";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidUpdate() {
    this.el.scrollIntoView({ behavior: "auto" });
  }
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "auto" });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="chat-wrapper">
        <div className="chat-list">
          {/* //list of messages */}
          {this.props.messages
            ? this.props.messages.map(message =>
                message.senderId === this.props.authUser.id ? (
                  <li key={message.id} className="align-right">
                    <span className="bubble bubble-right">
                      {message.message}
                    </span>
                  </li>
                ) : (
                  <li className="align-left" key={message.id}>
                    <span className="bubble bubble-left">
                      {message.message}
                    </span>
                  </li>
                )
              )
            : null}
          <div
            ref={el => {
              this.el = el;
            }}
          />
        </div>
        {/* <hr/> */}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (this.state.message) {
              this.props.firebase.createMessage(
                this.state.message,
                this.props.roomId,
                this.props.authUser.id,
                this.props.authUser.id === this.props.recieverId
                  ? this.props.senderId
                  : this.props.recieverId
              );
            }
            this.setState({ message: "" });
          }}
        >
          <div className="chatbox">
            <TextField
              id="filled-basic"
              label="Enter is send"
              variant="filled"
              className="chatbox"
              name="message"
              ref={this.props.messageBox}
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withFirebase(ChatWindow);
