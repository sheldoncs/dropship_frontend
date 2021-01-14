import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Checkout extends Component {
  state = {};
  pushPage = () => {
    let page = { page: "PAYMENT", path: "/payment" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find(
        (element) => element.page == "PAYMENT"
      );
      if (!found) {
        this.props.onSavePage(page);
      }
    } else {
      this.props.onSavePage(page);
    }
  };

  componentDidMount() {}
  render() {
    return <div></div>;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
