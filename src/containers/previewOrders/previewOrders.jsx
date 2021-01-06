import React, { Component } from "react";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Settings from "../../components/settings/settings";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import fetch from "../../fetchservice/fetchservice";
import { categoryQuery } from "../../Query/Query";
import Footer from "../../components/footer/footer";
import classes from "./PreviewOrders.module.css";
import Orders from "../../components/orders/orders";
import Subtotal from "../../components/subtotal/subtotal";
import { textSpanIsEmpty } from "typescript";

class PreviewOrders extends Component {
  abortController = new AbortController();
  state = {
    menu: null,
    orders: null,
    totalprice: 0.0,
    offertotal: 0.0,
    grandtotal: 0.0,
    showOffer: false,
  };
  componentDidMount() {
    let tempState = { ...this.state };

    let quantity = 0;
    let totalQuantity = this.props.orders.map((data, index) => {
      quantity = data.quantity + quantity;
      tempState.totalprice = data.totalprice + tempState.totalprice;

      return quantity;
    });
    if (this.props.offer != null) {
      tempState.showOffer = true;
      if (this.props.offer.offertype == "PERCENT") {
        tempState.offertotal =
          (this.props.offer.amount / 100) * tempState.totalprice;
        tempState.grandtotal = tempState.totalprice - tempState.offertotal;
      }
      console.log("offer", this.props.offer);
    }
    this.props.onSaveQuantity(totalQuantity);
    tempState.orders = this.props.orders;
    tempState.quantity = totalQuantity;

    if (this.props.menu != null) {
      let tempMenu = this.props.menu;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      tempState.menu = filteredMenu;
    } else {
      this.fetchMenuQuery();
    }

    //console.log("orders", this.props.orders);

    this.setState({ ...tempState });
  }
  fetchMenuQuery = () => {
    let query = categoryQuery;

    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempMenu = res.data.getAllCategories;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      this.setState({ menu: filteredMenu });
    });
  };
  componentWillUnmount() {
    this.abortController.abort();
  }
  spinnerHandler = (event, itemid) => {
    // alert(event.target.value);
  };
  render() {
    return (
      <React.Fragment>
        {this.props.user != null ? (
          <Settings
            count={this.state.total}
            showCart={true}
            welcome={this.props.user.firstname}
          />
        ) : (
          <Settings count={this.state.quantity} welcome="" showCart={true} />
        )}
        <NavigationItems
          menuItems={this.state.menu}
          page="login"
          clicked={(id) => this.navigationHandler(id)}
        />
        <div className={classes.CartLabel}>YOUR SHOPPING CART</div>
        <div className={classes.Container}>
          <Orders
            orders={this.state.orders}
            spinnerChange={(e, val) => this.spinnerHandler(e, val)}
          />
        </div>
        <Subtotal
          offerType={this.props.offer.offer}
          subtotal={this.state.totalprice}
          showOffer={this.state.showOffer}
          offerTotal={this.state.offertotal}
          grandTotal={this.state.grandtotal}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu,
    user: state.login.user,
    offer: state.offer.offer,
    orders: state.orderCategory.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveOrder: (order) => dispatch(actionCreators.saveOrder(order)),
    onSaveQuantity: (quantity) =>
      dispatch(actionCreators.saveQuantity(quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewOrders);
