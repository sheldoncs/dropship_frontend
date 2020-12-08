import React from "react";
import classes from "./SmallPhotos.module.css";
import { ReactSmartScroller } from "react-smart-scroller";
import ScrollArea from "react-scrollbar";

const SmallPhotos = (props) => {
  let smallPhotos = null;

  if (props.showSubPhotos == true) {
    if (props.urlphotos.subPhotos != null) {
      smallPhotos = props.urlphotos.subPhotos.map((value, index) => {
        return (
          <div
            className={classes.Pointer}
            key={index}
            onClick={() => props.clicked(value.itemid)}
          >
            <div
              className="pt-2"
              style={{ margin: "auto", width: "56px", height: "50px" }}
            >
              <img
                src={value.photo}
                style={{ objectFit: "cover" }}
                className={classes.Photos}
              />
            </div>
          </div>
        );
      });
    }
  }

  return (
    //

    <ScrollArea
      smoothScrolling={true}
      speed={10000}
      className={classes.LeftPhotos}
      horizontal={false}
    >
      {smallPhotos}
    </ScrollArea>
  );
};

export default SmallPhotos;
