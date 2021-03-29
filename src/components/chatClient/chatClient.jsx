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
  let chatDiv = [];

  if (props.conversations.length > 1 || props.displayHeader === true) {
    chatMessage = (
      <ChatMessage
        displayHeader={props.displayHeader}
        onActivate={props.onActivate}
        conversations={props.conversations}
        headerTitle={props.headerTitle}
        role={props.role}
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
    <div id="chatlist" className={classes.ChatClient}>
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
          onClick={() => props.eventChanged(value)}
        >
          Send
        </button>
      </div>
    </div>
  ) : null;

  return <div>{chatArea}</div>;
};

export default chatClient;
