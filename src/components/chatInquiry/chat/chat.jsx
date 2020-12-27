import React from "react";
import classes from "./Chat.module.css";

const chat = (props) => {
  let conversation = null;
  if (props.conversation.length > 0) {
    conversation = props.conversation.map((value, index) => {
      return (
        <div key={index} className={classes.Conversation}>
          COw
        </div>
      );
    });
  }
  return <div className={classes.Chat}>{conversation}</div>;
};

export default chat;
