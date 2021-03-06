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
  getNonDiscountOffers,
  lastIdentityQuery,
} from "../../Query/Query";

import Settings from "../../components/settings/settings";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import NavigateBar from "../../components/navigateBar/navigateBar";
import fetch from "../../fetchservice/fetchservice";
import Cover from "../../components/cover/cover";
import Message from "../../components/errorMessage/errorMessage";
import { throwServerError } from "@apollo/client";

class ProductPage extends Component {
  abortController = new AbortController();
  state = {
    photos: { subPhotos: null, main: null },
    offer: null,
    categoryinfo: null,
    nonDiscountOffers: null,
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
      itemprice: 0.0,
      deduction: 0.0,
      category: null,
    },
    hairType: {
      elementType: "select",
      elementName: "HairType",
      elementConfig: {
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
  pushPage = () => {
    let page = { page: "PRODUCT", path: "/productpage" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find(
        (element) => element.page == "PRODUCT"
      );
      if (!found) {
        this.props.onSavePage(page);
      }
    } else {
      this.props.onSavePage(page);
    }
  };
  popPage = () => {
    let page = { page: "CART", path: "/previeworder" };
    if (this.props.pages.length > 0) {
      const found = this.props.pages.find((element) => element.page == "CART");
      if (found) {
        this.props.onRemovePage(page);
      }
    }
  };

  componentDidMount() {
    let specialoffer = null;
    this.popPage();
    this.pushPage();

    if (this.props.user != null) {
      this.setState({ firstname: this.props.user.firstname });
    }
    this.setState({ menu: this.props.menu, categoryinfo: this.props.category });

    specialoffer = this.props.offer;

    this.setState({ isOffer: true });

    this.fetchNonDiscountOffer();
    this.fetchPhotosQuery(this.props.category.categoryid);

    if (specialoffer != null) {
      this.fetchOfferQuery(this.props.offer.id);
    }
    this.fetchPricesByCategory(this.props.category.categoryid);
    this.fetchItemAndCategory(this.props.category.itemid);

    this.fetchOptions(this.props.category.categoryid);
    this.fetchLastIdentity();
    window.scrollTo(0, 0);
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
      this.props.onSaveLastIdentity(tempState.order.lastidentityid);
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

    // let category = JSON.parse(sessionStorage.getItem("category"));

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

      let filteredPhotos = res.data.getPhotosByCategory.filter(function (el) {
        let offer = JSON.parse(sessionStorage.getItem("nonDiscOffers"));
        let found = offer.find((element) => element.itemdetailsid != el.itemid);
        return found;
      });

      tempState.photos.subPhotos = filteredPhotos;

      this.fetchItemAndCategory(this.props.category.itemid);

      let mainPhoto = photos.map((data) => {
        if (this.props.category.isOffer) {
          if (tempState.offer.offertype == "PERCENT") {
            if (Number(data.itemid) == Number(this.props.category.itemid)) {
              return data.photo;
            }
          } else if (tempState.offer.offertype == "SUBTRACT") {
            if (Number(data.itemid) == Number(tempState.offer.itemdetailsid)) {
              return data.photo;
            }
          }
        } else {
          if (Number(data.itemid) == Number(this.props.category.itemid)) {
            return data.photo;
          }
        }
      });

      let selPhoto = mainPhoto.filter(function (el) {
        return el != undefined;
      });

      if (this.props.category.isOffer) {
        if (tempState.offer.offertype == "SUBTRACT") {
          tempState.photos.main = selPhoto;
          tempState.order.photo = selPhoto;
        } else if (tempState.offer.offertype == "PERCENT") {
          tempState.photos.main = selPhoto[0];
        }
      } else {
        tempState.photos.main = selPhoto[0];
        tempState.order.photo = selPhoto[0];
      }
      this.setState({ ...tempState });
      this.photoHandler(this.props.category.itemid, tempState.photos.main);
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
      tempState.priceOptions = res.data.getPriceOptions;
      tempState.hairlength = res.data.getPriceOptions[0].hairlength;

      this.setState({
        ...tempState,
      });
    });
  };
  fetchNonDiscountOffer = () => {
    let query = getNonDiscountOffers;
    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempState = { ...this.state };
      tempState.nonDiscountOffers = res.data.getNonDiscountOffers;
      sessionStorage.setItem(
        "nonDiscOffers",
        JSON.stringify(tempState.nonDiscountOffers)
      );
      this.setState({ ...tempState });
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
        tempState.order.photo = value.photo;
        tempState.order.itemid = val;
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
    let category = null;
    let tempState = { ...this.state };

    let valid = true;

    category = this.props.category;

    for (let keys in tempState.order) {
      if (keys == "itemid") {
        valid = tempState.order[keys] > 0;
      } else if (keys == "itemname") {
        valid = tempState.order[keys] != "";
      } else if (keys == "lastidentityid") {
        valid = tempState.order[keys] > 0;
      } else if (keys == "price") {
        if (category != null && category.isOffer) {
          valid = tempState.order[keys] > 0;
        } else {
          valid = true;
          tempState.order[keys] = category.price;
        }
      } else if (keys == "hairlength") {
        if (category != null && category.isOffer) {
          valid = tempState.order[keys] != "";
        } else {
          valid = true;
        }
      } else if (keys == "hairtype") {
        if (category != null && category.isOffer) {
          valid = tempState.order[keys] != "";
        } else {
          valid = true;
        }
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
        tempState.order.offer = this.props.offer;
        tempState.order.category = this.props.category;
        this.props.onSaveOrder(tempState.order);
        this.props.onSaveQuantity(tempState.order["quantity"]);

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
        tempState.order.price = value.price;
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
        <div style={{ diplay: "flex", height: "1200px" }}>
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
            <Settings
              welcome={this.state.firstname}
              count={
                this.props.quantity != undefined ? this.props.quantity : null
              }
            />
          ) : (
            <Settings
              welcome=""
              count={
                this.props.quantity != undefined ? this.props.quantity : null
              }
            />
          )}
          <NavigationItems menuItems={this.state.menu} />
          <NavigateBar submenu={this.state.submenu} />
          <ProductAndPrice
            urlphotos={this.state.photos}
            offer={this.state.offer}
            itemname={this.state.order.itemname}
            order={this.state.order}
            categoryinfo={this.state.categoryinfo}
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
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu,
    lastidentityid: state.identity.lastIdentityid,
    user: state.login.user,
    offer: state.offer.offer,
    quantity: state.quantity.quantity,
    orders: state.orderCategory.orders,
    category: state.category.category,
    pages: state.navPages.pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
    onSaveLastIdentity: (lastidentityid) =>
      dispatch(actionCreators.saveLastIdentity(lastidentityid)),
    onSaveOrder: (order) => dispatch(actionCreators.saveOrder(order)),
    onSavePage: (page) => dispatch(actionCreators.savePage(page)),
    onRemovePage: (page) => dispatch(actionCreators.removePage(page)),
    onSaveCategory: (category) =>
      dispatch(actionCreators.saveCategory(category)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
    onSaveQuantity: (quantity) =>
      dispatch(actionCreators.saveQuantity(quantity)),
    onRemoveQuantity: (quantity) =>
      dispatch(actionCreators.removeQuantity(quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
