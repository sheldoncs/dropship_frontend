import React from "react";
import classes from "./Display.module.css";

const display = (props) => {
  let prices = props.prices;
  let items = null;
  let btnClasses = [];
  btnClasses.push("btn");
  btnClasses.push(classes.btn_info);

  let lengths = "";
  if (props.items != null && props.prices != null) {
    for (let price in props.prices) {
      lengths = lengths + " " + props.prices[price].hairlength;
    }
    items = props.items.map((value, index) => {
      return (
        <div key={value.itemid} className={classes.griditem}>
          <div>
            {value.categoryid == 2 ? (
              <img src={value.photo} className={classes.ImgDimen} />
            ) : (
              <img src={value.photo} className={classes.otherDimen} />
            )}
          </div>

          {value.categoryid == 2 ? (
            <div>
              <div style={{ fontWeight: "bold" }}>{value.option}</div>
              <div style={{ fontWeight: "normal", fontSize: "16px" }}>
                Available in {lengths}
              </div>
            </div>
          ) : null}

          <div style={{ marginTop: "20px" }}>
            {value.categoryid == 2 ? (
              <div
                style={{ fontWeight: "normal", fontSize: "16px", color: "red" }}
              >
                {props.prices[0].price != undefined
                  ? "FROM " + props.prices[0].price + "USD"
                  : null}
              </div>
            ) : (
              <div
                className="pt-1"
                style={{
                  fontWeight: "normal",
                  fontSize: "16px",
                  background: "#34363b",
                  color: "#fff",
                  width: "80%",
                  margin: "auto",
                  height: "35px",
                  borderRadius: "15px",
                }}
              >
                {value.price.toFixed(2)} USD
              </div>
            )}

            <button
              style={{ marginTop: "20px" }}
              onClick={() =>
                props.clickHandler(value.categoryid, value.itemid, value.price)
              }
              className={btnClasses.join(" ")}
            >
              ORDER NOW
            </button>
          </div>
        </div>
      );
    });
  }
  //   props.items.map((value, index) => {});

  return <div className={classes.Display}>{items}</div>;
};

export default display;
