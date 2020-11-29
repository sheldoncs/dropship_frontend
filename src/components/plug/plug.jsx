import React from "react";
import classes from "./Plug.module.css";

const Plug = (props) => {
  let tempClasses = [classes.Button];
  tempClasses.push("btn-dark");
  return (
    <div>
      <button className={tempClasses.join(" ")}>{props.children}</button>
    </div>
  );
};

export default Plug;
