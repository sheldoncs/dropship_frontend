import React from "react";
import classes from "./ExpandedPhoto.module.css";

const ExpandedPhoto = (props) => {
  if (props.urlphoto.subPhotos != null) {
    console.log("urlPhotos", props.urlphoto);
  }
  return (
    <div className={classes.ExpandedPhoto}>
      <div className="ml-1 mt-4 pl-5">
        {/* <img src={props.urlPhhotos.mainphoto} className={classes.Photo} /> */}
      </div>
    </div>
  );
};

export default ExpandedPhoto;
