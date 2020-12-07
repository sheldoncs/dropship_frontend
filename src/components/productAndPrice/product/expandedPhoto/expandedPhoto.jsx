import React from "react";
import classes from "./ExpandedPhoto.module.css";

const ExpandedPhoto = (props) => {
  let photos = props.urlphoto.main;
  if (props.urlphoto.main != null) {
    for (let index in props.urlphoto.subPhotos) {
      if (props.offer.itemdetailsid != null) {
        if (
          props.urlphoto.subPhotos[index].itemid == props.offer.itemdetailsid
        ) {
          photos = null;
          photos = props.urlphoto.subPhotos[index].photo;
        }
      }
    }
  }

  return (
    <div className={classes.ExpandedPhoto}>
      <div className="ml-1 mt-4 pl-5">
        {props.urlphoto.main != null ? (
          <img src={photos} className={classes.Photo} />
        ) : null}
      </div>
    </div>
  );
};

export default ExpandedPhoto;
