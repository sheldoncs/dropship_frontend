import React from "react";
import classes from "./ChatInquiry.module.css";
import Clients from "./clients/clients";
import Chat from "./chat/chat";
import Input from "../input/input";
const chatInquiry = (props) => {
  let btnClass = [classes.Button];
  btnClass.push("btn");
  btnClass.push("btn-info");
  let eventObject = null;
  let value = "";
  function inputHandler(event) {
    event.preventDefault();
    eventObject = event;

    value = event.target.value;
  }
  return (
    <div className={classes.GroupComponents}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "35%",
          margin: "auto",
        }}
      >
        <Input
          elementType={props.chatMessage.elementtype}
          elementName={props.chatMessage.elementname}
          elementConfig={props.chatMessage.elementConfig}
          changed={(event) => inputHandler(event)}
        />
        <button
          onClick={() => props.sendclicked(value, eventObject)}
          style={{ height: "41px", marginTop: "19px" }}
          className="btn btn-danger  ml-3"
        >
          Send
        </button>
      </div>
      <div className={classes.ChatInquiry}>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}
        >
          <Clients
            chatters={props.chatters}
            clicked={(socketid) => props.clientclicked(socketid)}
          />
          <div className={classes.Buttons}>
            <button className={btnClass.join(" ")}>Release Room</button>
            <button className={btnClass.join(" ")}>Remove Chatter</button>
          </div>
          <Chat conversation={props.conversation} />
        </div>
      </div>
    </div>
  );
};

export default chatInquiry;
