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
import { updateMainPhoto, resetMainPhoto } from "../../Mutation/Mutation";
import ChatButton from "../../components/button/chatButton/chatButton";
import ChatClient from "../../components/chatClient/chatClient";
import socket from "../../components/socket/socket";
import ChatController from "../../components/chatController/chatController";

import soundfile from "../../assets/sound/chatsignal.mp3";
import fetch from "../../fetchservice/fetchservice";
import { throwServerError } from "@apollo/client";
import Spinner from "../../components/Spinner/Spinner";
import Cover from "../../components/cover/cover";
import classes from "./Home.module.css";

class Home extends Component {
  abortController = new AbortController();
  signal = this.abortController.signal;
  openInterval = 0;
  state = {
    user: { name: "", admin: 0 },
    menu: null,
    openInterval: null,
    categoryId: 2,
    offers: null,
    offer: null,
    showIntro: false,
    chatPressed: false,
    onActivate: false,
    displayHeader: false,
    channels: [],
    chatters: [],
    socketid: "",
    switchItem: false,
    clientsocketid: "",
    items: {
      itemList: null,
      priceOptions: null,
    },
    chatType: {
      elementType: "input",
      elementName: "chatClient",
      elementConfig: { type: "text", placeholder: "Chat" },
      visibility: "true",
      value: "",
    },
    chatName: {
      elementType: "input",
      elementName: "chatName",
      elementConfig: { type: "text", placeholder: "Chat Name" },
      visibility: "true",
      value: "",
    },
    chatEmail: {
      elementType: "input",
      elementName: "email",
      elementConfig: { type: "text", placeholder: "email" },
      visibility: "true",
      value: "",
    },
    conversation: { name: "", message: "" },
    conversations: [],
    intervalCalled: false,
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
    if (this.props.pages) {
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
      tempState.user.name = this.props.user.firstname;
      tempState.user.admin = this.props.user.admin;

      this.setState({ ...tempState });
    }
    this.setState({ showIntro: true });
    this.fetchAllCategories();
    this.fetchOffers();
    this.fetchPriceOptions();
    if (this.props.category) {
      this.fetchAllItems(this.props.category.categoryid);
    } else {
      this.fetchAllItems(this.state.categoryId);
    }

    socket.on("connection id", (data) => {
      this.props.onSaveSocketId(data);
      this.setState({ socketid: data });
    });
    socket.on("message", (data) => {
      try {
        this.manageChatters(data);
      } catch (error) {}
    });
  }
  manageChatters = (data) => {
    let tempState = { ...this.state };
    let chatter = null;

    chatter = tempState.chatters.find(
      (element) => element.socketid == data.socketid
    );

    /*If chatter exist get the index of the array*/
    if (chatter != undefined) {
      let index = tempState.chatters.findIndex(
        (element) => element.socketid == chatter.socketid
      );

      chatter.messages.push({ displayed: false, message: data.message });

      /*Update chatters array with updated chatter message*/
      tempState.chatters[index] = chatter;
    } else {
      /*Brand new chatter*/

      tempState.chatters.push({
        name: data.name,
        email: data.email,
        opened: false,
        socketid: data.socketid,
        clientsocketid: data.clientsocketid,
        admin: data.admin,
        messages: [{ displayed: false, message: data.message }],
      });
      /*Brand new chatter*/
    }
    this.setState({ ...tempState.chatters });
    /* Displays messages from client and admin */

    if (tempState.user.admin == 1) {
      /*Server */
      if (data.admin == 0) {
        this.start();
        /*Ensure interval is called once*/
        if (!tempState.intervalCalled) {
          this.checkOpenedClient();
          this.setState({ intervalCalled: true });
        } else {
          this.processOpenedClient();
        }
      }
    } else if (tempState.user.admin == 0) {
      /*Client */

      /*Check if message has come from the server*/
      if (data.admin == 1 && data.clientsocketid == tempState.socketid) {
        this.start();
        let conversation = { name: data.name + " : ", message: data.message };
        tempState.conversation = conversation;
        tempState.conversations.push(conversation);

        this.setState({
          ...tempState,
        });
      }
    }
  };
  checkOpenedClient = () => {
    this.openInterval = setInterval(() => {
      this.processOpenedClient();
    }, 2000);
  };
  processOpenedClient = () => {
    let tempState = { ...this.state };
    let chatter = tempState.chatters.find((element) => element.opened == true);

    if (chatter) {
      this.stopInterval();

      tempState.clientsocketid = chatter.clientsocketid;
      let chatterIndex = tempState.chatters.findIndex(
        (element) => element.socketid == chatter.clientsocketid
      );
      /* Show messages not displayed by client */

      let conversations = [];
      chatter.messages.map((chatterInfo, index) => {
        if (chatterInfo.displayed === false) {
          let conversation = {
            name: chatter.name + " : ",
            message: chatterInfo.message,
          };

          conversations.push(conversation);

          tempState.conversations.push(conversation);
          tempState.chatters[chatterIndex].messages[index].displayed = true;
          this.setState({
            clientsocketid: chatter.clientsocketid,
            ...tempState,
          });
        }
      });
    }
  };
  stopInterval = () => {
    clearInterval(this.openInterval);
    this.setState({ intervalCalled: false });
  };
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

    if (this.props.category == null || this.props.category == undefined) {
      variables = { categoryid: 2 };
    } else {
      variables = { categoryid: Number(this.state.categoryId) };
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
  fetchAllItems = (catid) => {
    this.setState({ switchItem: true });
    let query = getAllItems;
    let variables = { categoryid: Number(catid) };

    fetch(
      {
        variables,
        query: query,
      },
      { signal: this.signal }
    )
      .then((res) => {
        let tempState = { ...this.state };
        tempState.items.itemList = res.data.getAllItems;
        tempState.switchItem = false;
        this.setState({ ...tempState });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  handleOffer = (id, itemid) => {
    let category = { categoryid: 2, itemid, isOffer: true };
    this.props.onSaveCategory(category);
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
    } else {
      this.fetchAllItems(catId);
    }
    this.setState({ categoryId: catId });
  };
  chatHandler = () => {
    let tempState = { ...this.state };

    //

    this.setState({ chatPressed: !tempState.chatPressed });
  };

  eventHandler = (msg, event) => {
    let tempState = { ...this.state };

    /*new messages sent from client or admin*/
    tempState.channels[0].messages.push({ displayed: false, message: msg });
    let data = {
      socketid: this.props.socketid,
      clientsocketid:
        tempState.user.admin == 1
          ? tempState.clientsocketid
          : this.props.socketid,
      name: tempState.channels[0].name,
      email: tempState.channels[0].email,
      message: msg,
      opened: false,
      admin: this.state.user.admin,
    };

    /*Messages not sent */
    let obj = tempState.channels[0].messages.find(
      (element) => element.displayed === false
    );
    /*Get Index of message */
    let msgIndex = tempState.channels[0].messages.findIndex(
      (element) => element.message === obj.message
    );

    let conversation = {
      name: tempState.channels[0].name + " : ",
      message: obj.message,
    };

    tempState.channels[0].messages[msgIndex].displayed = true;
    tempState.conversation = conversation;
    console.log("conversations before push", tempState.conversations);
    tempState.conversations.push({
      name: tempState.channels[0].name + " : ",
      message: obj.message,
    });
    console.log("conversations after", tempState.conversations);
    tempState.chatType.value = "";
    this.setState({
      ...tempState.conversations,
    });
    event.target.value = "";
    socket.emit("message", data);
  };
  activateChatHandler = (nameEvent, emailEvent) => {
    if (nameEvent != null && emailEvent != null) {
      let tempState = { ...this.state };

      tempState.channels.push({
        name: nameEvent.target.value,
        email: emailEvent.target.value,
        messages: [],
        showIntro: false,
      });

      this.setState({
        ...tempState,
        onActivate: true,
        showIntro: false,
        displayHeader: true,
        name: nameEvent.target.value,
      });

      nameEvent.target.value = "";
      emailEvent.target.value = "";
    }
  };
  /*Designed to open/close chat line with a client*/
  controllerHandler = (val) => {
    let tempState = { ...this.state };
    let chatData = null;
    if (val == "addChat" && tempState.chatters.length > 0) {
      if (tempState.chatters.length > 0) {
        chatData = tempState.chatters[0];
      }

      let chatteridx = tempState.chatters.findIndex(
        (element) => element.socketid == chatData.socketid
      );

      chatData.opened = true;

      tempState.chatters[chatteridx].opened = chatData.opened;

      this.setState({ ...tempState });
    } else {
      /*Get Previous chatter*/
      let removeChatter = tempState.chatters.find(
        (element) => element.opened == true
      );

      /*Resetting new chatter list */
      tempState.conversations = [];
      if (tempState.chatters.length > 0) {
        tempState.chatters = tempState.chatters.filter(
          (element) => element.opened == false
        );

        let data = {
          socketid: this.state.socketid,
          clientsocketid:
            this.state.user.admin == 1 ? removeChatter.clientsocketid : 0,
          name: removeChatter.name,
          email: removeChatter.email,
          message: "Chat Ended",
          admin: this.state.user.admin,
        };

        /*Let previous chatter know that chat has ended */
        socket.emit("message", data);
        this.setState({ intervalCalled: false, ...tempState });
      }
    }
  };
  displayHandler = (catid, itemid, price) => {
    let value = null;
    let category = {};
    let offerlist = this.state.offers;
    let offer = null;
    if (itemid == 5) {
      value = offerlist.find(
        (element) =>
          element.categoryid == catid && element.itemdetailsid == itemid
      );
    } else {
      value = offerlist.find(
        (element) =>
          element.categoryid == catid && element.itemdetailsid != itemid
      );
    }

    if (value != undefined) {
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
    }

    if (catid != 2) {
      category = { categoryid: catid, itemid: itemid, isOffer: false, price };
    } else {
      category = { categoryid: catid, itemid: itemid, isOffer: true };
    }
    this.props.onSaveOffer(offer);
    this.props.onSaveCategory(category);

    this.props.history.push("/productpage");
  };
  resetMainPhoto = (categoryid) => {
    let query = resetMainPhoto;
    let variables = { categoryid: Number(categoryid) };
    fetch({ query, variables })
      .then((resp) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  updateMainPhoto = (categoryid) => {
    let query = resetMainPhoto;
    let variables = { categoryid: Number(categoryid) };
    fetch({ query, variables })
      .then((resp) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {
    return (
      <div>
        <div>
          {this.state.switchItem === true ? (
            <div>
              <div className={classes.Middle}>
                <Spinner />
              </div>
              <div>
                <Cover />
              </div>
            </div>
          ) : null}
        </div>
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
          value={this.state.chatType.value}
          chatName={this.state.chatName}
          chatEmail={this.state.chatEmail}
          showIntro={this.state.showIntro}
          displayHeader={this.state.displayHeader}
          role={this.state.user.admin}
          conversations={this.state.conversations}
          onActivate={this.state.onActivate}
          headerTitle={this.state.name}
          activateChat={(nameEvent, emailEvent) =>
            this.activateChatHandler(nameEvent, emailEvent)
          }
          eventChanged={(msg, event) => this.eventHandler(msg, event)}
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
          clicked={(id) => this.navigationHandler(id)}
          menuItems={this.state.menu}
        />
        {this.state.offers != null ? (
          <Offer
            offers={this.state.offers}
            clicked={(id, itemid) => this.handleOffer(id, itemid)}
          />
        ) : null}
        <Display
          items={this.state.items.itemList}
          prices={this.state.items.priceOptions}
          clickHandler={(catid, itemid, price) =>
            this.displayHandler(catid, itemid, price)
          }
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
    category: state.category.category,
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
    onSaveCategory: (category) =>
      dispatch(actionCreators.saveCategory(category)),
  };
};

export { socket };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
