import React from "react";
import classes from "./ChatButton.module.css";
import ChatLogo from "../../../assets/chatlogo.png";

const chatButton = (props) => {
  return (
    <div onClick={props.chatClicked} className={classes.ChatButton}>
      <img src={ChatLogo} />
    </div>
  );
};

export default chatButton;
