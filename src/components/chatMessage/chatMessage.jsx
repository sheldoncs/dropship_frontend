import React from "react";
import classes from "./ChatMessage.module.css";

const chatMessage = (props) => {
  return (
    <div className={classes.chatMessage}>
      <div className={classes.Participant}>{props.participant}</div>
      <div className={classes.Message}>{props.message}</div>
    </div>
  );
};

export default chatMessage;
