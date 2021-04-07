import React from "react";
import classes from "./ChatIntro.module.css";
import Input from "../input/input";

const chatIntro = (props) => {
  let emailEvent = null;
  let nameEvent = null;
  function inputNameHandler(event) {
    event.preventDefault();
    nameEvent = event;
  }
  function inputEmailHandler(event) {
    event.preventDefault();
    emailEvent = event;
  }
  let btnClasses = [classes.Button];
  btnClasses.push("btn");
  btnClasses.push("btn-danger");
  console.log(props);
  return (
    <div className={classes.ChatIntro}>
      <Input
        elementtype={props.chatName.elementType}
        elementconfig={props.chatName.elementConfig}
        elementname={props.chatName.elementName}
        visibility={props.chatName.visibility}
        changed={(event) => inputNameHandler(event)}
      />
      <Input
        elementtype={props.chatEmail.elementType}
        elementconfig={props.chatEmail.elementConfig}
        elementname={props.chatEmail.elementName}
        visibility={props.chatEmail.visibility}
        changed={(event) => inputEmailHandler(event)}
      />
      <button
        onClick={() => props.activateChat(nameEvent, emailEvent)}
        className={btnClasses.join(" ")}
      >
        <div className="center-text">ACTIVATE CHAT</div>
      </button>
    </div>
  );
};

export default chatIntro;
