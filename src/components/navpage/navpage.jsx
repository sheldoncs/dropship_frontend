import React from "react";
import classes from "./NavPage.module.css";

const NavPage = (props) => {
  let div = "";
  let lineup = props.pages.map((data, index) => {
    if (index == props.pages.length - 1) {
      return (
        <div
          key={index}
          onClick={() => props.clickedPage(data.path)}
          className={classes.NavLinkEnd}
        >
          {data.page}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div
            key={index}
            onClick={() => props.clickedPage(data.path)}
            className={classes.NavLink}
          >
            <a href="#">{data.page}</a>
          </div>
          {index > 0 ? <div className={classes.Direction}>{">"}</div> : null}
        </React.Fragment>
      );
    }
  });
  return <div className={classes.NavPage}>{lineup}</div>;
};

export default NavPage;
