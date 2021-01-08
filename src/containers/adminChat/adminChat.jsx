import React, { Component } from "react";
import { socket } from "../home/home";
import ChatInquiry from "../../components/chatInquiry/chatInquiry";
import fetch from "../../fetchservice/fetchservice";
import { activeChatters, deactivatChatter } from "../../Query/Query";

class AdminChat extends Component {
  state = {
    chatters: [],
    conversation: [],
    socketid: "",
    chatMessage: {
      elementype: "input",
      elementname: "chatMessage",
      elementConfig: { type: "text", placeholder: "Chat" },
      visibility: true,
    },
  };
  componentDidMount() {
    let query = activeChatters;
    const variables = {
      active: 1,
    };
    fetch({
      query,
      variables,
    }).then((res) => {
      this.setState({ chatters: res.data.getActiveChatters });
    });

    socket.on("chatroom", (data) => {
      console.log("chatroom", data);
    });
  }

  deactivateHandler = (socketid) => {
    let query = deactivatChatter;
    const variables = {
      socketid: socketid,
    };
    fetch({
      query,
      variables,
    }).then((res) => {
      console.log(res);
    });
  };
  socketIdHandler = (val) => {
    socket.on("to_admin_msg", (data) => {
      alert(data);
      this.setState({ socketid: val });
    });
  };
  handleSend = (msg, eventObject) => {
    socket.emit("sendtoclient", {
      name: "Tyler",
      message: msg,
      socketid: this.state.socketid,
    });
    let tempState = { ...this.state };
    tempState.conversation.push({ name: "Tyler", message: msg });
    this.setState({ ...tempState });
  };
  render() {
    return (
      <div>
        <ChatInquiry
          sendclicked={(value, eventObject) =>
            this.handleSend(value, eventObject)
          }
          clientclicked={(socketid) => this.socketIdHandler(socketid)}
          deactivate={(socketid) => this.deactivateHandler(socketid)}
          chatters={this.state.chatters}
          chatMessage={this.state.chatMessage}
          conversation={this.state.conversation}
        />
      </div>
    );
  }
}

export default AdminChat;
