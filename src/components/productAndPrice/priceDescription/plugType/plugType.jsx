import React from "react";
import classes from "./PlugType.module.css";
import Plug from "../../../plug/plug";
import Operator from "../../../operator/operator";
import Lock from "../../../../assets/lock.png";

const PlugType = (props) => {
  let operatorClass = [classes.Operator];
  let buttonClass = [classes.Button];
  let buyButtonClass = [classes.Button];
  buttonClass.push("btn");
  buttonClass.push("btn-info");
  buyButtonClass.push("btn");
  buyButtonClass.push("btn-outline-info");

  operatorClass.push("pt-1");
  return (
    <div className={classes.PlugType}>
      <div className={classes.Features}>
        <div className={classes.PlugLeft}>
          <span className="pl-2">PLUG TYPE</span>
          <div className={classes.Plugs}>
            <Plug>US</Plug>
            <Plug>EU</Plug>
            <Plug>AU</Plug>
            <Plug>UK</Plug>
          </div>
        </div>
        <div className={classes.PlugRight}>
          <span className="pl-2">QUANTITY</span>
          <div className={classes.AlignOperator}>
            <Operator>
              <span className={classes.Operator}>+</span>
            </Operator>
            <span className={operatorClass.join(" ")}>1</span>
            <Operator className={classes.Operator}>
              <span className={classes.Operator}>-</span>
            </Operator>
          </div>
        </div>
      </div>
      <div className={classes.Actions}>
        <div className={classes.SetupButton}>
          <button className={buttonClass.join(" ")}>ADD T0 CART</button>
        </div>
        <div className={classes.SetupButton}>
          <button className={buyButtonClass.join(" ")}>
            <img style={{ width: "30px", height: "30px" }} src={Lock} />
            CHECKOUT
            <img style={{ width: "30px", height: "30px" }} src={Lock} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlugType;
