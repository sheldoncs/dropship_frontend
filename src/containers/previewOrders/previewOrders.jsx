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
import CartActions from "../../components/cartactions/cartactions";
import Summary from "../../components/cartactions/summary/summary";
import Cover from "../../components/cover/cover";

// import NavPage from "../../components/navpage/navpage";

class PreviewOrders extends Component {
  abortController = new AbortController();

  state = {
    menu: null,
    orders: null,
    totalprice: 0.0,
    offertotal: 0.0,
    grandtotal: 0.0,
    showOffer: false,
    quantity: 0,
    labels: [],
    offer: null,
    orderindex: 0,
    openSummary: false,
    openCover: false,
  };
  calcTotals = () => {
    let tempState = { ...this.state };
    let orders = null;

    if (this.props.orders.length > 0) {
      orders = this.props.orders;
      localStorage.setItem("orders", JSON.stringify(this.props.orders));
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
    }

    tempState.orders = orders;

    let quantity = 0;
    tempState.totalprice = 0;
    let totalQuantity = orders.map((data, index) => {
      quantity = Number(data.quantity) + Number(quantity);

      let itemprice = 0.0;
      if (data.offer != null) {
        tempState.showOffer = true;
        if (data.offer.offertype == "PERCENT") {
          data.deduction =
            (data.offer.amount / 100) *
            Number(data.quantity) *
            Number(data.price);
          itemprice = data.price * data.quantity - data.deduction;
          data.itemprice = itemprice;
        } else if (data.offer.offertype == "SUBTRACT") {
          data.deduction = Number(data.quantity) * Number(data.offer.amount);
          itemprice =
            Number(data.price) * Number(data.quantity) - data.deduction;
          data.itemprice = itemprice;
        }
        if (this.props.orders == null) {
          this.props.onSaveOrder(data);
        }
      }

      tempState.totalprice = itemprice + tempState.totalprice;
      tempState.grandtotal = tempState.totalprice;
      this.setState({ ...tempState });
      return quantity;
    });

    this.props.onSaveQuantity(totalQuantity);
    tempState.quantity = quantity;
    this.setState({ orders: tempState.orders, ...tempState });
  };
  pushPage = () => {
    let page = { page: "CART", path: "/previeworder" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find((element) => element.page == "CART");
      if (!found) {
        this.props.onSavePage(page);
      }
    } else {
      this.props.onSavePage(page);
    }
  };
  popPage = () => {
    let page = { page: "CHECKOUT", path: "/checkout" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find(
        (element) => element.page == "CHECKOUT"
      );
      if (found) {
        this.props.onRemovePage(page);
      }
    }
  };
  componentDidMount() {
    this.popPage();
    this.pushPage();
    let tempState = { ...this.state };

    this.calcTotals();

    if (this.props.menu != null) {
      let tempMenu = this.props.menu;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      tempState.menu = filteredMenu;
      this.setState({ menu: tempState.menu });
    } else {
      this.fetchMenuQuery();
    }
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
    let tempState = { ...this.state };

    let filteredOrder = tempState.orders.filter(function (el) {
      return el.itemid == itemid;
    });
    filteredOrder[0].quantity = event.target.value;

    this.props.onUpdateOrder(filteredOrder);
    tempState.quantity = 0;
    tempState.orders.map((data, index) => {
      if (data.itemid == itemid) {
        tempState.orders[index].quantity = event.target.value;
        tempState.quantity =
          Number(event.target.value) + Number(tempState.quantity);
      } else {
        tempState.quantity = Number(data.quantity) + Number(tempState.quantity);
      }

      this.props.onSaveQuantity(tempState.quantity);

      this.setState({ ...tempState });
      localStorage.setItem("orders", JSON.stringify(this.state.orders));
      this.calcTotals();
    });
  };
  prevHandler = (val) => {
    if (val >= 1) {
      val = val - 1;
      this.setState({ orderindex: val });
    }
  };
  nextHandler = (val) => {
    if (val <= this.state.orders.length - 1) {
      val = val + 1;
      this.setState({ orderindex: val });
    }
  };
  showSummary = () => {
    let tempState = { ...this.state };
    tempState.openSummary = !tempState.openSummary;
    this.setState({ ...tempState });
  };
  checkoutHandler = () => {
    this.props.history.push("/checkout");
  };
  render() {
    return (
      <React.Fragment>
        <Cover show={this.state.openSummary} clicked={this.showSummary} />
        <Summary
          clickedCheckout={this.checkoutHandler}
          openSummary={this.state.openSummary}
          offerType={this.props.offer != null ? this.props.offer.offer : null}
          subtotal={this.state.totalprice}
          showOffer={this.state.showOffer}
          offerTotal={this.state.offertotal}
          grandTotal={this.state.grandtotal}
          orders={this.state.orders}
        />
        {this.props.user != null ? (
          <Settings
            count={this.state.quantity}
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
        {/* <NavPage pages={this.props.pages} /> */}
        <div className={classes.CartLabel}>YOUR SHOPPING CART</div>

        <div className={classes.Container}>
          <Orders
            orders={this.state.orders}
            orderindex={this.state.orderindex}
            prevClick={(val) => this.prevHandler(val)}
            nextClick={(val) => this.nextHandler(val)}
            spinnerChange={(e, val) => this.spinnerHandler(e, val)}
          />
        </div>
        <CartActions clickShowSummary={this.showSummary} />
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
    quantity: state.orderCategory.quantity,
    pages: state.navPages.pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSavePage: (page) => dispatch(actionCreators.savePage(page)),
    onRemovePage: (page) => dispatch(actionCreators.removePage(page)),
    onSaveOrder: (order) => dispatch(actionCreators.saveOrder(order)),
    onUpdateOrder: (order) => dispatch(actionCreators.updateOrder(order)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
    onSaveQuantity: (quantity) =>
      dispatch(actionCreators.saveQuantity(quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewOrders);
