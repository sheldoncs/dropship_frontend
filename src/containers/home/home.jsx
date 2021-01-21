import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import * as actionCreators from "../../store/actions/index";
import Offer from "../../components/offers/offers";
import Settings from "../../components/settings/settings";
import Display from "../../components/display/display";
import Footer from "../../components/footer/footer";
import {
  offers,
  pricesByCategory,
  getAllItems,
  categoryQuery,
} from "../../Query/Query";
import ChatButton from "../../components/button/chatButton/chatButton";
import ChatClient from "../../components/chatClient/chatClient";
import socket from "../../components/socket/socket";
import ChatController from "../../components/chatController/chatController";

import soundfile from "../../assets/sound/chatsignal.mp3";
import fetch from "../../fetchservice/fetchservice";

class Home extends Component {
  abortController = new AbortController();
  signal = this.abortController.signal;

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
    this.props.history.push("/productpage");
  };
  componentDidUpdate(prevProps, prevState) {
    let tempState = { ...this.state };
    let menuValues = tempState.menu;
  }

  start = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };
  pushPage = () => {
    let page = { page: "HOME", path: "/" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find((element) => element.page == "HOME");
      if (!found) {
        this.props.onSavePage(page);
      }
    } else {
      this.props.onSavePage(page);
    }
  };
  componentDidMount() {
    this.pushPage();
    this._isMounted = true;
    if (this.props.user != null) {
      let tempState = { ...this.state };
      tempState.socketid = this.props.socketid;
      tempState.user.name = this.props.user.firstname;
      tempState.user.admin = this.props.user.admin;
      this.setState({ ...tempState });
    }
    this.setState({ showIntro: true });
    this.fetchAllCategories();
    this.fetchOffers();
    this.fetchPriceOptions();
    this.fetchAllItems();

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
      try {
        let tempState = { ...this.state };

        if (this.props.user != null) {
          if (this.props.user.admin == 1) {
            this.start();
            this.props.onSaveClientSocketId(data.socketid);
            tempState.clientsocketid = data.socketid;

            this.setState({ ...tempState });

            if (tempState.chatters != null) {
              const chatter = tempState.chatters.find(
                (element) => element.opened == true
              );
            }

            this.setState({ ...tempState });

            if (tempState.chatters.length > 0) {
              const chatter = tempState.chatters(
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
          } else if (this.props.user.admin == 0) {
            if (data.clientsocketid == this.state.socketid) {
              this.start();
              tempState.channels.push({
                name: data.name.replace(":", "") + ":",
                message: data.message,
                onActivate: false,
                showIntro: false,
              });
              this.setState({ ...tempState });
            }
          }
        } else {
          if (data.clientsocketid == this.state.socketid) {
            this.start();
            tempState.channels.push({
              name: data.name.replace(":", "") + ":",
              message: data.message,
              onActivate: false,
              showIntro: false,
            });
            this.setState({ ...tempState });
          }
        }
      } catch (error) {}
    });
  }
  arrayFilterHandler = () => {
    //var filtered = someArray.filter(function(el) { return el.Name != "Kristian"; });
  };
  fetchOffers = () => {
    let query = offers;
    fetch(
      {
        query: query,
      },
      { signal: this.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.offers = res.data.getAllOffers;
      this.setState({ ...tempState });
    });
  };
  fetchPriceOptions = () => {
    let query = pricesByCategory;
    let variables = null;
    if (this.props.category == null) {
      variables = { categoryid: 2 };
    } else {
      variables = { categoryid: Number(this.props.category.id) };
    }

    fetch(
      {
        query,
        variables,
      },
      { signal: this.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.items.priceOptions = res.data.getPriceOptions;
      this.setState({ ...tempState });
    });
  };

  fetchAllCategories = () => {
    let query = categoryQuery;

    this.signal.addEventListener("abort", () => {
      // Logs true:
      console.log("signal abort = " + this.signal.aborted);
    });

    fetch(
      {
        query: query,
      },
      { signal: this.signal }
    ).then((res) => {
      this.props.onSaveMenu(res.data.getAllCategories);
      this.setState({ menu: res.data.getAllCategories });
    });
  };
  fetchAllItems = () => {
    let query = getAllItems;
    fetch(
      {
        query: query,
      },
      { signal: this.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.items.itemList = res.data.getAllItems;
      this.setState({ ...tempState });
    });
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
        this.props.history.push("/productpage");
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
    } else {
      if (tempState.chatters != null) {
        tempState.chatters = tempState.chatters.find(
          (element) => element.opened == false
        );
        tempState.channels.push({
          name: "Chat Ended",
          email: tempState.channels[0].email,
          message: "",
          onActivate: false,
          showIntro: false,
        });
        let data = {
          socketid: this.state.socketid,
          clientsocketid: this.state.clientsocketid,
          name: "",
          message: "Chat Ended",
          admin: this.state.admin,
        };

        socket.emit("message", data);
        this.setState({ ...tempState });
      }
    }
  };
  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {
    return (
      <div>
        <div>
          <audio className="audio-element">
            <source src={soundfile}></source>
          </audio>
        </div>
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
          <Settings
            count={this.props.quantity}
            welcome={this.props.user.firstname}
          />
        ) : (
          <Settings welcome="" count={this.props.quantity} />
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
    quantity: state.orderCategory.quantity,
    pages: state.navPages.pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSavePage: (page) => dispatch(actionCreators.savePage(page)),
    onRemovePage: (page) => dispatch(actionCreators.removePage(page)),
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
