import React from "react";
import classes from "./Orders.module.css";
import dustbin from "../../assets/dustbin.png";
const orders = (props) => {
  let orderrow = null;
  if (props.orders != null) {
    orderrow = props.orders.map((value, index) => {
      return (
        <div key={index} className={classes.Orders}>
          <div className={classes.OrderRow}>
            <div className={classes.RowMargin}>
              <div className="mb-2">
                <img className={classes.Photo} src={value.photo} />
              </div>
              <div className={classes.RemoveButton}>
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="text-center pt-1"
                >
                  <div>
                    <img src={dustbin} />
                  </div>
                  <div className="pt-1 pl-3">REMOVE</div>
                </div>
              </div>
            </div>
            <div className={classes.RowMargin}>
              <div
                style={{ position: "flex", flexDirection: "column" }}
                className="mt-5"
              >
                <div>
                  <span>
                    <b>Style:</b> {value.itemname}
                  </span>
                </div>
                <div></div>
              </div>
            </div>

            <div className={classes.RowMargin}>
              <div className="mt-5">
                <span>
                  <b>Hair Type: </b>
                </span>
                <span>{value.hairtype}</span>
              </div>
            </div>
            <div className={classes.RowMargin}>
              <div className="mt-5">
                <span>
                  <b>Hair Length: </b>
                </span>
                <span>{value.hairlength}</span>
              </div>
            </div>
            <div className={classes.RowMargin}>
              <div className="mt-4">
                <span>
                  <b>Quantity: </b>
                </span>
                <input
                  type="number"
                  value={value.quantity}
                  className={classes.Spinner}
                  onChange={(e) => props.spinnerChange(e, value.itemid)}
                />
              </div>
            </div>
            <div className={classes.RowMargin}>
              <div className="mt-5">
                <span>
                  <b> Unit Price: </b>
                </span>
                <span>{Number(value.price).toFixed(2)}</span>
              </div>
            </div>
            <div className={classes.RowMargin}>
              <div className="mt-5">
                <span>
                  <b> Total: </b>
                </span>
                <span>
                  {(Number(value.price).toFixed(2) * value.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return <div>{orderrow}</div>;
};

export default orders;
