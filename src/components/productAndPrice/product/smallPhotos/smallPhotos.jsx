import React from "react";
import classes from "./SmallPhotos.module.css";

const SmallPhotos = (props) => {
  return (
    <div className={classes.LeftPhotos}>
      <div
        className={classes.Pointer}
        onClick={() => props.clicked(props.urlphotos.left.url1.index)}
      >
        <div
          className="pt-2"
          style={{ margin: "auto", width: "56px", height: "50px" }}
        >
          {/* <img
            src={props.urlphotos.left.url1.photo}
            className={classes.Photos}
          /> */}
        </div>
      </div>
      <div
        className={classes.Pointer}
        onClick={() => props.clicked(props.urlphotos.left.url2.index)}
      >
        <div
          className="pt-2"
          style={{ margin: "auto", width: "56px", height: "50px" }}
        >
          {/* <img
            src={props.urlphotos.left.url2.photo}
            className={classes.Photos}
          /> */}
        </div>
      </div>
      <div
        className={classes.Pointer}
        onClick={() => props.clicked(props.urlphotos.left.url3.index)}
      >
        <div
          className="pt-2"
          style={{ margin: "auto", width: "56px", height: "50px" }}
        >
          {/* <img
            src={props.urlphotos.left.url3.photo}
            className={classes.Photos}
          /> */}
        </div>
      </div>
      <div
        className={classes.Pointer}
        onClick={() => props.clicked(props.urlphotos.left.url4.index)}
      >
        <div
          className="pt-2"
          style={{ margin: "auto", width: "56px", height: "50px" }}
        >
          {/* <img
            src={props.urlphotos.left.url4.photo}
            className={classes.Photos}
          /> */}
        </div>
      </div>
      <div
        className={classes.Pointer}
        onClick={() => props.clicked(props.urlphotos.left.url5.index)}
      >
        <div
          className="pt-2"
          style={{ margin: "auto", width: "56px", height: "50px" }}
        >
          {/* <img
            src={props.urlphotos.left.url5.photo}
            className={classes.Photos}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SmallPhotos;
