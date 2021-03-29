import React from "react";
import classes from "./ChatMessage.module.css";

const chatMessage = (props) => {
  let result = (
    <div>
      {props.displayHeader == true ? (
        <div className={classes.Welcome}>
          <div className="text-center pt-1 ml-3">
            {"Welcome " + props.headerTitle}
          </div>
        </div>
      ) : null}
      {props.onActivate == true
        ? props.conversations.map((data, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "row", width: "50%" }}
              >
                <div className={classes.Participant}>{data.name}</div>
                <div className={classes.Message}>{data.message}</div>
              </div>
            );
          })
        : null}
    </div>
  );

  return <div className={classes.chatMessage}>{result}</div>;
};

export default chatMessage;
