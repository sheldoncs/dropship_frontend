import React, { Component } from "react";
import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import * as actionCreators from "../../store/actions/index";
import Offer from "../../components/offers/offers";
import Settings from "../../components/settings/settings";
import Display from "../../components/display/display";
import Footer from "../../components/footer/footer";
import { offers, pricesByCategory } from "../../Query/Query";
import ChatButton from "../../components/button/chatButton/chatButton";
import ChatClient from "../../components/chatClient/chatClient";
import socket from "../../components/socket/socket";
import { textSpanIsEmpty } from "typescript";

class Home extends Component {
  state = {
    menu: null,
    offers: null,
    offer: null,
    showIntro: false,
    chatPressed: false,
    onActivate: true,
    chatMessage: null,
    channels: [],
    chatters: [
      { name: "", socketid: "", open: false, messages: [{ message: "" }] },
    ],
    socketid: "",
    items: {
      itemList: null,
      priceOptions: null,
    },
    chatType: {
      elemenType: "input",
      elementName: "chatClient",
      elementConfig: { type: "text", placeholder: "Chat" },
      visibility: "true",
    },
    chatName: {
      elemenType: "input",
      elementName: "chatName",
      elementConfig: { type: "text", placeholder: "Chat Name" },
      visibility: "true",
      value: "",
    },
    chatEmail: {
      elemenType: "input",
      elementName: "email",
      elementConfig: { type: "text", placeholder: "email" },
      visibility: "true",
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
    // console.log(this.props.user);
    this.setState({ showIntro: true });
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

    socket.on("new_msg", function (data) {
      console.log(data);
      let tempState = { ...this.state };
      if (tempState.socketid == data.socketid) {
        tempState.channels.push({
          name: data.name + ":",
          email: tempState.channels[0].email,
          message: data.message,
          onActivate: false,
          showIntro: false,
        });

        tempState.onActivate = false;
        this.setState({ ...tempState });
      }
    });
    socket.on("chatroom", (data) => {
      console.log("chatroom", data);
    });
    socket.on("connection id", (data) => {
      console.log(data);
      this.setState({ socketid: data });
    });
    socket.on("message", (data) => {
      let tempState = { ...this.state };

      if (tempState.chatters.length > 0) {
        const found = tempState.chatters.find(
          (element) => element.socketid == data.socketid
        );
        if (found) {
          tempState.chatters.forEach((chatter) => {
            if (chatter.socketid == data.socketid) {
              chatter.messages.push({ message: data.message });
            }
          });
        } else {
          tempState.chatters.push({
            name: data.name,
            socketid: data.socketid,
            messages: [{ message: data.message }],
          });
        }
      } else {
        tempState.chatters.push({
          name: data.name,
          socketid: data.socketid,
          messages: [{ message: data.message }],
        });
      }
      console.log(tempState.chatters);
    });
  }
  arrayFilterHandler = () => {
    //var filtered = someArray.filter(function(el) { return el.Name != "Kristian"; });
  };
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
    if (catId == 1) {
      this.props.history.push("/");
    }
  };
  chatHandler = () => {
    let tempState = { ...this.state };
    //

    this.setState({ chatPressed: !tempState.chatPressed });
  };
  eventHandler = (message, name, event) => {
    socket.emit("message", {
      socketid: this.state.socketid,
      name: name,
      message: message,
    });

    let tempState = { ...this.state };

    tempState.channels.push({
      name: name + ":",

      message: message,
      onActivate: false,
      showIntro: false,
    });

    // tempState.onActivate = false;
    // this.setState({ ...tempState });
    // if (event != null) {
    //   event.target.value = "";
    //   socket.emit("name", name);
    //   socket.emit("client_message", message);
    // }
  };
  activateChatHandler = (nameEvent, emailEvent) => {
    if (nameEvent != null && emailEvent != null) {
      let tempState = { ...this.state };

      tempState.channels.push({
        name: nameEvent.target.value,
        email: emailEvent.target.value,
        message: "",
        showIntro: false,
        onActivate: true,
      });
      socket.emit("name", tempState.channels[0].name);
      socket.emit("nameandemail", {
        name: tempState.channels[0].name,
        email: tempState.channels[0].email,
        socketid: "",
      });
      socket.emit("email", tempState.channels[0].email);
      // socket.emit(, { email: tempState.channels[0].email });
      socket.on("socketid", (data) => {
        let tempState = { ...this.state };
        tempState.socketid = data.socketid;
        this.setState({ ...tempState });
        alert(data.socketid);
      });
      this.setState({ ...tempState });
      nameEvent.target.value = "";
      emailEvent.target.value = "";
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
          chatName={this.state.chatName}
          chatEmail={this.state.chatEmail}
          showIntro={this.state.showIntro}
          channels={this.state.channels}
          setActive={this.state.onActivate}
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
          page="home"
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

export { socket };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
