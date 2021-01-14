import React from "react";
import classes from "./Orders.module.css";
import dustbin from "../../assets/dustbin.png";
import Orderlabels from "./orderlabels/orderlabels";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const orders = (props) => {
  let orderinfo = null;

  if (props.orders != null) {
    orderinfo = (
      <div>
        <div className={classes.Orders}>
          <div className={classes.PhotoContainer}>
            <img
              className={classes.Photo}
              src={props.orders[props.orderindex].photo}
            />
          </div>
          <div>
            <Orderlabels summaryInfo={props.orders[props.orderindex]} />
          </div>
        </div>
      </div>
    );
    // orderrow = props.orders.map((value, index) => {
    //   return (
    //     <div key={index} className={classes.Orders}>
    //       <div className={classes.OrderRow}>
    //         <div className={classes.RowMargin}>
    //           <div className="mb-2">
    //             <img className={classes.Photo} src={value.photo} />
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div
    //             style={{ position: "flex", flexDirection: "column" }}
    //             className="mt-4"
    //           >
    //             <div>
    //               <span>{value.itemname}</span>
    //             </div>
    //             <div className={classes.RemoveButton}>
    //               <div
    //                 style={{ display: "flex", flexDirection: "row" }}
    //                 className="pt-1"
    //               >
    //                 <div style={{ margin: "auto", color: "#ccc" }}>
    //                   <span className="text-center">REMOVE</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>{value.hairtype}</span>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>{value.hairlength}</span>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-0">
    //             <input
    //               type="number"
    //               value={value.quantity}
    //               className={classes.Spinner}
    //               onChange={(e) => props.spinnerChange(e, value.itemid)}
    //             />
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>{Number(value.price).toFixed(2)}</span>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>
    //               {(Number(value.price).toFixed(2) * value.quantity).toFixed(2)}
    //             </span>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>{Number(value.deduction).toFixed(2)}</span>
    //           </div>
    //         </div>
    //         <div className={classes.RowMargin}>
    //           <div className="mt-4">
    //             <span>{Number(value.itemprice).toFixed(2)}</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
  }
  return <div>{orderinfo}</div>;
};

export default orders;
