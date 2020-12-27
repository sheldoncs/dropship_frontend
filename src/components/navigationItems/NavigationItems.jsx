import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./navigationItem/navigationItem";
import HamBurger from "../../components/hamburgerBars/hamburgerBars";

const navigationItems = (props) => {
  let elem = null;
  let showClasses = [classes.ShowNavigation];
  if (props.menuItems != null) {
    elem = props.menuItems.map((value, index) => {
      // return value.category == "Home" ? (
      //   <NavigationItem
      //     key={value.id}
      //     onClick={() => props.clicked(value.id)}
      //     link="/"
      //   >
      //     {value.category.toUpperCase()}
      //   </NavigationItem>
      // ) : (
      return (
        <NavigationItem
          key={value.id}
          page={props.page}
          clicked={() => props.clicked(value.id)}
          link={"/" + value.category}
        >
          {value.category.toUpperCase()}
        </NavigationItem>
      );
      // );
    });
  }
  return (
    <React.Fragment>
      <div
        className={showClasses.join(" ")}
        style={{ margin: "auto", width: "100%", backgroundColor: "#f0eded" }}
      >
        <div className={classes.NavigationItems}>{elem}</div>
      </div>
      <div className={classes.ShowBurger}>
        <HamBurger clicked={props.clicked} />
      </div>
    </React.Fragment>
  );
};

export default navigationItems;
