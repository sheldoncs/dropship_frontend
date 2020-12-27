import React from "react";
import classes from "./ChatMessage.module.css";

const chatMessage = (props) => {
  let result = props.channels.map((value, index) => {
    return (
      <div key={index}>
        {value.onActivate == false ? (
          <div>
            <div className={classes.Participant}>{value.name}</div>
            <div className={classes.Message}>{value.message}</div>
          </div>
        ) : (
          <div className={classes.Welcome}>
            <div className="text-center pt-1">{"Welcome " + value.name}</div>
          </div>
        )}
      </div>
    );
  });
  return <div className={classes.chatMessage}>{result}</div>;
};

export default chatMessage;
