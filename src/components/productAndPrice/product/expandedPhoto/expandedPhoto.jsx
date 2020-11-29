import React from "react";
import classes from "./ExpandedPhoto.module.css";

const ExpandedPhoto = (props) => {
  return (
    <div className={classes.ExpandedPhoto}>
      <div className="ml-1 mt-4 pl-5">
        <img src={props.urlphoto.right.mainUrl} className={classes.Photo} />
      </div>
    </div>
  );
};

export default ExpandedPhoto;
