import React from "react";
import classes from "./Clients.module.css";
import ChatPerson from "../../../assets/chatperson.png";

const clients = (props) => {
  let user = null;
  if (props.chatters.length > 0) {
    user = props.chatters.map((value, index) => {
      return (
        <div
          key={value.socketid}
          onClick={() => props.clicked(value.socketid)}
          className={classes.Client}
        >
          <div>
            <img src={ChatPerson} />
          </div>
          <div className="pt-2">{value.name}</div>
        </div>
      );
    });
  }
  return <div className={classes.Clients}>{user}</div>;
};

export default clients;
