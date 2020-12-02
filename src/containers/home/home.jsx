import React, { Component } from "react";
import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import IntroHeader from "../../components/intro/intro";
import Ribbon from "../../components/ribbon/ribbon";
import FirstDetails from "../../components/firstDetails/firstDetails";
import SecondDetails from "../../components/secondDetails/secondDetails";
import * as actionCreators from "../../store/actions/index";
import Offer from "../../components/offers/offers";
import Settings from "../../components/settings/settings";
import Display from "../../components/display/display";
import Footer from "../../components/footer/footer";
import { offers } from "../../Query/Query";

class Home extends Component {
  state = {
    menu: null,
    offers: null,
    offer: null,
    items: {
      itemList: null,
      priceOptions: null,
    },
  };

  purchaseHandler = () => {
    this.props.history.push("/purchase");
  };
  componentDidUpdate(prevProps, prevState) {
    let tempState = { ...this.state };
    let menuValues = tempState.menu;
  }
  componentDidMount() {
    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    fetch({
      query: `query  {
      getAllCategories {
        id
        category
      }
    }`,
    }).then((res) => {
      this.props.onSaveMenu(res.data.getAllCategories);
      this.setState({ menu: res.data.getAllCategories });
    });
    const fetchOffers = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    fetchOffers({
      query: offers,
    }).then((res) => {
      let tempState = { ...this.state };
      tempState.offers = res.data.getAllOffers;
      this.setState({ ...tempState });
    });
    const fetchItems = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    fetchItems({
      query: `query  {
        getAllItems {
        id
        option
        photo
        itemid
      }
    }`,
    }).then((res) => {
      let tempState = { ...this.state };
      tempState.items.itemList = res.data.getAllItems;
      this.setState({ ...tempState });
    });
    const fetchPriceOptions = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    fetchPriceOptions({
      query: `query  {
        getPriceOptions {
          id
          hairlength
          itemid
          price
      }
    }`,
    }).then((res) => {
      let tempState = { ...this.state };
      tempState.items.priceOptions = res.data.getPriceOptions;
      this.setState({ ...tempState });
    });
  }
  handleOffer = (id) => {
    let offerList = this.state.offers;
    let tempState = { ...this.state };

    offerList.map((value, index) => {
      let offer = {};
      if (value.id == id) {
        offer = {
          id: value.id,
          offer: value.offer,
          itemdetailsid: value.itemdetailsid,
          offertype: value.offertype,
          amount: value.amount,
          condition: value.condition,
          code: value.code,
          categoryid: value.categoryid,
        };

        this.props.onSaveOffer(offer);
        this.props.history.push("/purchase");
      }
    });
  };
  navigationHandler = (catId) => {
    alert(catId);
  };
  render() {
    if (this.props.user != null) {
      console.log(this.props.user);
    }
    return (
      <div>
        {this.props.user != null ? (
          <Settings welcome={this.props.user.firstname} />
        ) : (
          <Settings welcome="" />
        )}
        <NavigationItems
          clicked={this.navigationHandler}
          menuItems={this.state.menu}
        />
        {this.state.offers != null ? (
          <Offer offers={this.state.offers} clicked={this.handleOffer} />
        ) : null}
        <Display
          items={this.state.items.itemList}
          prices={this.state.items.priceOptions}
        />
        <Footer />
        {/* <IntroHeader clicked={this.purchaseHandler} />
        <Ribbon>IP66 LEVEL PROTECTION</Ribbon>
        <FirstDetails />
        <Ribbon>OTHER FEATURES</Ribbon>
        <SecondDetails /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu,
    user: state.login.user,
    offer: state.offer.offer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
