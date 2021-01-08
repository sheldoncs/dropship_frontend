import React from "react";
import ChatMessage from "../chatMessage/chatMessage";
import ScrollArea from "react-scrollbar";
import classes from "./ChatClient.module.css";
import Input from "../input/input";
import ChatIntro from "../chatIntro/chatIntro";

const chatClient = (props) => {
  let value = "";
  let eventObject = null;
  let chatMessage = "";

  if (props.channels.length > 0) {
    chatMessage = (
      <ChatMessage
        participant=""
        message=""
        setActive={value.onActivate}
        channels={props.channels}
      />
    );
  } else {
    if (props.showIntro) {
      chatMessage = (
        <ChatIntro
          chatName={props.chatName}
          chatEmail={props.chatEmail}
          activateChat={(nameEvent, emailEvent) =>
            props.activateChat(nameEvent, emailEvent)
          }
        />
      );
    }
  }

  function inputHandler(event) {
    event.preventDefault();
    eventObject = event;
    
    value = event.target.value;
  }
  let holdClasses = [classes.Button];
  holdClasses.push("btn");
  holdClasses.push("btn-warning");
  holdClasses.push("ml-2");

  let chatArea = props.chatPressed ? (
    <div className={classes.ChatClient}>
      <ScrollArea
        smoothScrolling={true}
        speed={10000}
        className={classes.ChatArea}
        horizontal={false}
      >
        {chatMessage}
      </ScrollArea>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "360px",
          margin: "auto",
        }}
      >
        <Input
          key={props.elementName}
          elementtype={props.elementType}
          elementconfig={props.elementConfig}
          elementname={props.elementName}
          visibility={props.visibility}
          changed={(event) => {
            inputHandler(event);
          }}
        />
        <button
          className={holdClasses.join(" ")}
          onClick={() =>
            props.eventChanged(value, props.channels[0].name, eventObject)
          }
        >
          Send
        </button>
      </div>
    </div>
  ) : null;

  return <div>{chatArea}</div>;
};

export default chatClient;
