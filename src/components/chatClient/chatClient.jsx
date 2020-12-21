import React from "react";
import ChatMessage from "../chatMessage/chatMessage";
import ScrollArea from "react-scrollbar";
import classes from "./ChatClient.module.css";
import Input from "../input/input";
import ChatIntro from "../chatIntro/chatIntro";

const chatClient = (props) => {
  let value = "";
  let eventObject = null;

  function inputHandler(event) {
    event.preventDefault();
    eventObject = event;
    console.log(event.target.name);
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
        {!props.showIntro ? (
          <ChatMessage
            participant={props.participant}
            message={props.message}
          />
        ) : (
          <ChatIntro
            chatEmail={props.chatEmail}
            chatName={props.chatName}
            activateChat={(nameEvent, emailEvent) =>
              props.activateChat(nameEvent, emailEvent)
            }
          />
        )}
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
