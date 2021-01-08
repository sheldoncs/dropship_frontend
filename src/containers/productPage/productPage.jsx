import React, { Component } from "react";
import ProductAndPrice from "../../components/productAndPrice/productAndPrice";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Footer from "../../components/footer/footer";
import Review from "../../components/review/review";
import axios from "../../axios/axios-orders";

import {
  offer,
  photosByCategory,
  itemAndCategory,
  options,
  pricesByCategory,
  categoryQuery,
  lastIdentityQuery,
} from "../../Query/Query";

import Settings from "../../components/settings/settings";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import NavigateBar from "../../components/navigateBar/navigateBar";
import fetch from "../../fetchservice/fetchservice";
import Cover from "../../components/cover/cover";
import Message from "../../components/errorMessage/errorMessage";

class ProductPage extends Component {
  abortController = new AbortController();
  state = {
    photos: { subPhotos: null, main: null },
    offer: null,
    count: 1,
    submenu: null,
    hairlength: null,
    options: null,
    priceOptions: null,
    openDrawer: false,
    openCover: false,
    showError: false,
    showCover: false,
    validOrder: false,
    message: "",
    menu: null,
    slideDown: false,
    firstname: null,
    showSubPhotos: true,
    isOffer: false,
    priceId: null,
    orders: [],
    order: {
      itemid: 0,
      itemname: "",
      lastidentityid: 0,
      price: 0.0,
      hairlength: "",
      hairtype: "",
      quantity: 0,
      offer: null,
      photo: null,
      totalprice: 0.0,
    },
    hairType: {
      elementtype: "select",
      elementname: "HairType",
      elementconfig: {
        selectoptions: [
          { value: "Malaysian", displayValue: "Malaysian hair" },
          { value: "Brazilian", displayValue: "Brazilian hair" },
          { value: "Peruvian", displayValue: "Peruvian hair" },
          { value: "Indian", displayValue: "Indian hair" },
        ],
      },
    },
    chatType: {
      elementype: "input",
      elementname: "chatClient",
      elementConfig: { type: "text", placeholder: "Chat" },
    },
  };

  setToAxios = (offer) => {
    setTimeout(() => {
      axios
        .post("/offer.json", offer)
        .then((response) => {
          console.log("axios", response);
        })
        .catch((error) => {
          console.log("axios", error);
        });
    }, 2000);
  };
  componentDidMount() {
    if (this.props.user != null) {
      localStorage.setItem("firstname", this.props.user.firstname);
      this.setState({ firstname: this.props.user.firstname });
    } else {
      this.setState({ firstname: localStorage.getItem("firstname") });
    }

    if (this.props.menu != null) {
      this.setState({ menu: this.props.menu });
    } else {
      this.fetchMenuQuery();
    }
    if (this.props.offer != null) {
      localStorage.setItem("offer", JSON.stringify(this.props.offer));
      localStorage.setItem("categoryid", this.props.offer.categoryid);
      localStorage.setItem("itemid", this.props.offer.itemdetailsid);
      localStorage.setItem("offerid", this.props.offer.id);
      localStorage.setItem("isOffer", true);
      this.setState({ isOffer: true });
    } else {
      let offer = JSON.parse(localStorage.getItem("offer"));
      this.props.onSaveOffer(offer);
      localStorage.setItem("categoryid", offer.categoryid);
      localStorage.setItem("itemid", offer.itemdetailsid);
      localStorage.setItem("offerid", offer.id);
      localStorage.setItem("isOffer", true);
    }
    this.fetchOfferQuery(localStorage.getItem("offerid"));
    this.fetchPhotosQuery(localStorage.getItem("categoryid"));
    this.fetchPricesByCategory(localStorage.getItem("categoryid"));

    if (localStorage.getItem("itemid") != "null") {
      this.fetchItemAndCategory(localStorage.getItem("itemid"));
    } else {
      this.fetchItemAndCategory(1);
    }
    this.fetchOptions(localStorage.getItem("categoryid"));
    this.fetchLastIdentity();
  }
  componentWillUnmount() {
    this.abortController.abort();
  }
  abortFetching(controller) {
    console.log("Now aborting");

    controller.abort();
  }
  fetchLastIdentity = () => {
    let query = lastIdentityQuery;
    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.order.lastidentityid = res.data.getMaxIdentity.maxidentityid;
    });
  };
  fetchMenuQuery = () => {
    let query = categoryQuery;

    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      this.setState({ menu: res.data.getAllCategories });
    });
  };
  fetchPhotosQuery = (categoryid) => {
    let query = photosByCategory;

    const variables = {
      categoryid: Number(categoryid),
    };

    fetch(
      {
        query,
        variables,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let photos = res.data.getPhotosByCategory;
      let tempState = { ...this.state };
      tempState.photos.subPhotos = res.data.getPhotosByCategory;

      let mainPhoto = photos.map((data) => {
        if (data.mainphoto == 1) {
          return data.photo;
        }
      });
      tempState.photos.main = mainPhoto[0];
      this.setState({ ...tempState });
    });
  };
  fetchPricesByCategory = (catid) => {
    let query = pricesByCategory;

    const variables = {
      categoryid: Number(catid),
    };

    fetch(
      {
        query,
        variables,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.order.price = res.data.getPriceOptions[0].price;
      tempState.priceOptions = res.data.getPriceOptions;
      tempState.hairlength = res.data.getPriceOptions[0].hairlength;

      this.setState({
        ...tempState,
      });
    });
  };
  fetchOfferQuery = (id) => {
    let query = offer;
    const variables = {
      id: Number(id),
    };

    fetch(
      {
        query,
        variables,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      let offerInfo = {
        item: res.data.getOffer.id,
        offer: res.data.getOffer.offer,
        itemdetailsid: res.data.getOffer.itemdetailsid,
        offertype: res.data.getOffer.offertype,
        amount: res.data.getOffer.amount,
        condition: res.data.getOffer.condition,
        width: res.data.getOffer.width,
        code: res.data.getOffer.code,
      };

      if (res.data.getOffer.itemdetailsid != null) {
        tempState.showSubPhotos = false;
      }
      if (tempState.showSubPhotos == false) {
        tempState.order.itemid = res.data.getOffer.itemdetailsid;
      }
      tempState.offer = offerInfo;
      this.setState({ ...tempState });
    });
  };
  fetchItemAndCategory = (itemid) => {
    let query = itemAndCategory;
    const variables = {
      itemid: Number(itemid),
    };

    fetch(
      {
        query,
        variables,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.order.itemname = res.data.getItemAndCategory.option;
      let submenu = {
        category: res.data.getItemAndCategory.category,
        item: res.data.getItemAndCategory.option,
      };
      tempState.submenu = submenu;
      this.setState({ ...tempState });
    });
  };
  fetchOptions = (categoryid) => {
    let query = options;
    const variables = {
      categoryid: Number(categoryid),
    };

    fetch(
      {
        query,
        variables,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      let options = res.data.options;
      tempState.options = options;

      this.setState({ ...tempState });
    });
  };

  photoHandler = (val, photo) => {
    let tempState = { ...this.state };
    tempState.order.itemid = val;
    tempState.order.photo = photo;
    this.setState({ ...tempState });
    this.state.photos.subPhotos.map((value, index) => {
      let tempState = { ...this.state };
      if (val == value.itemid) {
        tempState.order.itemid = value.itemid;
        this.fetchItemAndCategory(val);
        tempState.photos.main = value.photo;
        this.setState({ ...tempState });
      }
    });
  };

  sidebarHandler = () => {
    let tempState = { ...this.state };

    tempState.openDrawer = !tempState.openDrawer;
    tempState.openCover = !tempState.openCover;
    this.setState({ ...tempState });
  };

  handleCover = () => {
    let saveState = { ...this.state };

    if (saveState.openCover) {
      saveState.openDrawer = false;
      saveState.openCover = false;
      saveState.showError = false;
    } else {
      saveState.openCover = true;
    }

    this.setState({ ...saveState });
  };
  actionHandler = (val) => {
    let tempState = { ...this.state };

    let valid = true;
    for (let keys in tempState.order) {
      if (keys == "itemid") {
        valid = tempState.order[keys] > 0;
      } else if (keys == "itemname") {
        valid = tempState.order[keys] != "";
      } else if (keys == "lastidentityid") {
        valid = tempState.order[keys] > 0;
      } else if (keys == "price") {
        valid = tempState.order[keys] > 0;
      } else if (keys == "hairlength") {
        valid = tempState.order[keys] != "";
      } else if (keys == "hairtype") {
        valid = tempState.order[keys] != "";
      } else if (keys == "quantity") {
        valid = tempState.order[keys] > 0;
      }

      if (!valid) {
        break;
      }
    }

    if (valid) {
      tempState.order["totalprice"] =
        tempState.order["quantity"] * tempState.order["price"];
      if (val == "ADDTOCART") {
        this.props.onSaveOrder(tempState.order);
        tempState.orders.push({ ...tempState.order });

        this.setState({ ...tempState, slideDown: true, validOrder: true });
        setTimeout(this.timeOutHandler, 5000);
      }
    } else {
      tempState.showCover = true;
      tempState.showError = true;
      tempState.validOrder = false;
      tempState.message = "Select All Options";
      this.setState({ ...tempState });
    }
  };
  timeOutHandler = () => {
    this.setState({ slideDown: false });
  };
  hairLengthHandler = (val) => {
    let tempState = { ...this.state };
    tempState.order.hairlength = val;
    this.setState({ ...tempState });
    this.state.priceOptions.map((value, index) => {
      if (value.id == val) {
        tempState.priceId = val;
        tempState.hairlength = value.hairlength;
        tempState.order.hairlength = value.hairlength;
        this.setState({ ...tempState });
      }
    });
  };
  counterAddHandler = (val) => {
    let tempState = { ...this.state };
    val = val + 1;
    tempState.count = val;
    tempState.order.quantity = val;
    this.setState({ ...tempState });
  };
  counterSubtractHandler = (val) => {
    if (val > 1) {
      val = val - 1;
      this.setState({ count: val });
    }
  };
  selectChangeHandler = (event) => {
    let tempState = { ...this.state };
    tempState.hairType.value = event.target.value;
    tempState.order.hairtype = event.target.value;
    this.setState({ ...tempState });
  };

  errorHandler = () => {
    let tempState = { ...this.state };
    tempState.showCover = !this.state.showCover;
    tempState.showError = !this.state.showError;
    this.setState({ ...tempState });
  };
  reviewHandler = () => {
    let tempState = { ...this.state };
    if (this.state.validOrder) {
      this.props.history.push("/previeworder");
    } else {
      tempState.showCover = true;
      tempState.showError = true;
      tempState.message = "Select All Options";
    }
    this.setState({ ...tempState });
  };
  render() {
    return (
      <React.Fragment>
        <Cover show={this.state.showCover} clicked={this.errorHandler} />
        <Message
          clicked={this.errorHandler}
          show={this.state.showCover}
          showError={this.state.showError}
        >
          {this.state.message}
        </Message>
        <Review
          slideDown={this.state.slideDown}
          clicked={this.reviewHandler}
          title="REVIEW CART"
        />

        {this.props.user != null ? (
          <Settings welcome={this.state.firstname} />
        ) : (
          <Settings welcome="" />
        )}
        <NavigationItems menuItems={this.state.menu} />
        <NavigateBar submenu={this.state.submenu} />
        <ProductAndPrice
          urlphotos={this.state.photos}
          offer={this.state.offer}
          isOffer={this.state.isOffer}
          showSubPhotos={this.state.showSubPhotos}
          photoclicked={(val, photo) => this.photoHandler(val, photo)}
          priceOptions={this.state.priceOptions}
          category={this.state.submenu}
          hairType={this.state.hairType}
          priceId={this.state.priceId}
          hairlength={this.state.hairlength}
          clickReview={this.reviewHandler}
          clicked={(val) => this.hairLengthHandler(val)}
          lclicked={(val) => this.counterSubtractHandler(val)}
          rclicked={(val) => this.counterAddHandler(val)}
          whichButton={(val) => this.actionHandler(val)}
          count={this.state.count}
          selectChanged={(event) => {
            this.selectChangeHandler(event);
          }}
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
    category: state.orderCategory.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
    onSaveOrder: (order) => dispatch(actionCreators.saveOrder(order)),
    onSaveCategory: (category) =>
      dispatch(actionCreators.saveCategory(category)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
