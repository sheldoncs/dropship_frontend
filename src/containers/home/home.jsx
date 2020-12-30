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
import ChatController from "../../components/chatController/chatController";
import { throwServerError } from "@apollo/client";

class Home extends Component {
  state = {
    user: { name: "", admin: 0 },
    menu: null,
    offers: null,
    offer: null,
    showIntro: false,
    chatPressed: false,
    onActivate: true,
    chatMessage: null,
    channels: [],
    chatters: [],
    socketid: "",
    clientsocketid: "",
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
    if (this.props.user != null) {
      let tempState = { ...this.state };
      tempState.socketid = this.props.socketid;
      tempState.user.name = this.props.user.firstname;
      tempState.user.admin = this.props.user.admin;
      this.setState({ ...tempState });
    }
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
    socket.on("connection id", (data) => {
      this.props.onSaveSocketId(data);
      this.setState({ socketid: data });
    });
    socket.on("message", (data) => {
      console.log("receiving ", data);
      let tempState = { ...this.state };

      if (this.props.user != null) {
        if (this.props.user.admin == 1) {
          this.props.onSaveClientSocketId(data.socketid);
          tempState.clientsocketid = data.socketid;

          this.setState({ ...tempState });
        }
        if (tempState.chatters != null) {
          const chatter = tempState.chatters.find(
            (element) => element.opened == true
          );
        }

        console.log(tempState);
        this.setState({ ...tempState });

        if (tempState.chatters.length > 0) {
          const chatter = tempState.chatters.find(
            (element) => element.socketid == data.socketid
          );

          if (chatter) {
            chatter.messages.push({ message: data.message });
            if (chatter.opened) {
              tempState.channels.push({
                name: data.name + ":",
                message: data.message,
                onActivate: false,
                showIntro: false,
              });
              this.setState({ ...tempState });
            }
          } else {
            tempState.chatters.push({
              name: data.name,
              opened: false,
              socketid: data.socketid,
              messages: [{ message: data.message }],
            });
          }
        } else {
          tempState.chatters.push({
            name: data.name,
            opened: false,
            socketid: data.socketid,
            messages: [{ message: data.message }],
          });
        }
      } else {
        if (data.clientsocketid == this.state.socketid) {
          tempState.channels.push({
            name: data.name.replace(":", "") + ":",
            message: data.message,
            onActivate: false,
            showIntro: false,
          });
          this.setState({ ...tempState });
        }
      }
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
    let tempState = { ...this.state };
    if (tempState.user.admin == 1) {
      name = this.props.user.firstname;
    }

    if (this.props.user == null) {
      tempState.clientsocketid = tempState.socketid;

      this.setState({ ...tempState });
    } else {
      if (this.props.user.admin == 0) {
        tempState.clientsocketid = tempState.socketid;

        this.setState({ ...tempState });
      }

      this.setState({ ...tempState });
    }
    let data = {
      socketid: this.state.socketid,
      clientsocketid: this.state.clientsocketid,
      name: name,
      message: message,
      admin: this.state.admin,
    };
    console.log("transmit " + data);
    socket.emit("message", data);
    if (this.props.user != null) {
      if (this.props.user.admin == 1) {
      }
    } else {
    }
    tempState.channels.push({
      name: name + ":",
      message: message,
      onActivate: false,
      showIntro: false,
    });

    tempState.onActivate = false;
    this.setState({ ...tempState });
    if (event != null) {
      event.target.value = "";
    }
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
  controllerHandler = (val) => {
    let tempState = { ...this.state };
    let chatData = null;
    if (val == "addChat") {
      let maxlen = tempState.chatters.length;
      if (tempState.chatters.length > 0) {
        chatData = tempState.chatters.map((data, index) => {
          if (index == maxlen - 1) {
            if (data.opened == false) {
              return data;
            } else {
              return null;
            }
          }
        });
      }

      chatData.forEach((chatter) => {
        chatter.opened = true;
      });

      let name = chatData[0].name;
      chatData[0].messages.map((value, index) => {
        tempState.channels.push({
          name: name + ":",
          message: value.message,
          onActivate: false,
          showIntro: false,
        });

        this.setState({ ...tempState });
      });

      this.setState({ showIntro: false });
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
        {this.state.user.admin == 1 ? (
          <ChatController
            chatControlClicked={(val) => this.controllerHandler(val)}
          />
        ) : null}
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
    socketid: state.login.socketid,
    clisocketid: state.login.clisocketid,
    user: state.login.user,
    offer: state.offer.offer,
    order: state.orderCategory.order,
    category: state.orderCategory.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClientSocketId: (socketid) =>
      dispatch(actionCreators.saveClientSocketID(socketid)),
    onSaveSocketId: (socketid) =>
      dispatch(actionCreators.saveSocketID(socketid)),
    onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
  };
};

export { socket };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
