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
import { offers, pricesByCategory } from "../../Query/Query";
import ChatButton from "../../components/button/chatButton/chatButton";
import ChatClient from "../../components/chatClient/chatClient";
import socketClient from "socket.io-client";

class Home extends Component {
  state = {
    menu: null,
    offers: null,
    offer: null,
    showIntro: true,
    chatPressed: false,
    channels: [{ id: 1, name: "", participants: 1, message: "", email: "" }],
    items: {
      itemList: null,
      priceOptions: null,
    },
    chatType: {
      elemenType: "input",
      elementName: "chatClient",
      elementConfig: { type: "text", placeholder: "Chat" },
      visibility: true,
    },
    chatName: {
      elemenType: "input",
      elementName: "chatName",
      elementConfig: { type: "text", placeholder: "Chat Name" },
      visibility: true,
      value: "",
    },
    chatEmail: {
      elemenType: "input",
      elementName: "email",
      elementConfig: { type: "text", placeholder: "email" },
      visibility: true,
      value: "",
    },
  };

  purchaseHandler = () => {
    this.props.history.push("/product");
  };
  componentDidUpdate(prevProps, prevState) {
    let tempState = { ...this.state };
    let menuValues = tempState.menu;
  }
  componentDidMount() {
    const fetch = createApolloFetch({
      uri: "http://localhost:8080/graphql",
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
      uri: "http://localhost:8080/graphql",
    });
    fetchOffers({
      query: offers,
    }).then((res) => {
      let tempState = { ...this.state };
      tempState.offers = res.data.getAllOffers;
      this.setState({ ...tempState });
    });
    const fetchItems = createApolloFetch({
      uri: "http://localhost:8080/graphql",
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
      uri: "http://localhost:8080/graphql",
    });
    let query = pricesByCategory;
    let variables = null;
    if (this.props.category == null) {
      variables = { categoryid: 2 };
    } else {
      variables = { categoryid: Number(this.props.category.id) };
    }
    fetchPriceOptions({
      query,
      variables,
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
        this.props.history.push("/product");
      }
    });
  };
  navigationHandler = (catId) => {
    alert(catId);
  };
  chatHandler = () => {
    let tempState = { ...this.state };
    this.setState({ chatPressed: !tempState.chatPressed });
  };
  eventHandler = (message, name, event) => {
    const socket = socketClient("http://localhost:8080");
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
    });
    let tempState = { ...this.state };
    if (tempState.channels[0].name != "") {
      tempState.channels[0].name = name + ":";
    }
    tempState.channels[0].message = message;
    this.setState({ ...tempState });
    if (event != null) {
      event.target.value = "";
      socket.emit("name", name);
      socket.emit("client_message", message);
    }
  };
  activateChatHandler = (nameEvent, emailEvent) => {
    if (nameEvent != null && emailEvent != null) {
      let tempState = { ...this.state };
      tempState.channels[0].name = nameEvent.target.value;
      tempState.channels[0].email = emailEvent.tatget.value;
      tempState.showIntro = false;
      this.setState({ ...tempState });
    }
  };
  render() {
    return (
      <div>
        <ChatClient
          key={this.state.chatType.elementName}
          chatPressed={this.state.chatPressed}
          elementtype={this.state.chatType.elementType}
          elementconfig={this.state.chatType.elementConfig}
          elementname={this.state.chatType.elementName}
          visibility={this.state.visibility}
          chatName={this.state.chatName}
          chatEmail={this.state.chatEmail}
          showIntro={this.state.showIntro}
          participant={this.state.channels[0].name}
          message={this.state.channels[0].message}
          channels={this.state.channels}
          activateChat={(nameEvent, emailEvent) =>
            this.activateChatHandler(nameEvent, emailEvent)
          }
          eventChanged={(val, msg, event) => this.eventHandler(val, msg, event)}
        />
        <ChatButton chatClicked={this.chatHandler} />
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
    order: state.orderCategory.order,
    category: state.orderCategory.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
