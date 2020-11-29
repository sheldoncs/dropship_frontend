import React, { Component } from "react";
import classes from "./ChatRoom.module.css";

class ChatRoom extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={classes.ChatRoom}></div>;
  }
}

export default ChatRoom;
