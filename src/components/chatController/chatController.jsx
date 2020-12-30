import React from "react";
import classes from "./ChatController.module.css";
import addChatLogo from "../../assets/addchat.png";
import stopChatLogo from "../../assets/stopchat.png";

const chatController = (props) => {
  let btnClasses = [classes.Button];
  btnClasses.push("btn");
  btnClasses.push("btn-primary");

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.ChatController}>
        <button
          onClick={() => props.chatControlClicked("addChat")}
          className={btnClasses.join(" ")}
        >
          <img src={addChatLogo} />
        </button>
        <button
          className={btnClasses.join(" ")}
          onClick={() => props.chatControlClicked("stopChat")}
        >
          <img src={stopChatLogo} alt="Stop Chat" />
        </button>
      </div>
    </div>
  );
};

export default chatController;
