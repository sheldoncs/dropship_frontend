import React, { Component } from "react";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import ProductAndPrice from "../../components/productAndPrice/productAndPrice";
import IntroPhoto from "../../assets/intro1.png";
import MotionDetectorPhoto from "../../assets/motiondetector.png";
import NightVisionPhoto from "../../assets/nightvisionexplained.png";
import OpticalZoomPhoto from "../../assets/opticalzoom.png";
import CardStoragePhoto from "../../assets/cardstorage.png";
import SideDrawer from "../../components/sideDrawer/sideDrawer";
import Cover from "../../components/cover/cover";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import {
  offer,
  photosByCategory,
  itemAndCategory,
  options,
} from "../../Query/Query";
import { createApolloFetch } from "apollo-fetch";

class ProductPage extends Component {
  state = {
    photos: { subPhotos: null, main: null },
    offer: null,
    submenu: null,
    options: null,
    openDrawer: false,
    openCover: false,
    showError: true,
  };

  componentDidMount() {
    let query = null;

    if (this.props.offer != null) {
      localStorage.setItem("categoryid", this.props.offer.categoryid);
      localStorage.setItem("itemid", this.props.offer.itemdetailsid);
      localStorage.setItem("offerid", this.props.offer.id);
      localStorage.setItem("isOffer", true);
    }
    this.fetchOfferQuery(localStorage.getItem("offerid"));
    this.fetchPhotosQuery(localStorage.getItem("categoryid"));

    if (localStorage.getItem("itemid") != "null") {
      alert();
      this.fetchItemAndCategory(localStorage.getItem("itemid"));
    } else {
      this.fetchItemAndCategory(1);
    }
    this.fetchOptions(localStorage.getItem("categoryid"));
  }
  fetchPhotosQuery = (categoryid) => {
    let query = null;
    query = photosByCategory;
    const variables = {
      categoryid: Number(categoryid),
    };
    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    fetch({
      query,
      variables,
    }).then((res) => {});
  };
  fetchOfferQuery = (id) => {
    let query = null;
    const variables = {
      id: Number(id),
    };

    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    query = offer;

    fetch({
      query,
      variables,
    }).then((res) => {
      let tempState = { ...this.state };
      let itemAndCategory = {
        item: res.data.getOffer.id,
        offer: res.data.getOffer.offer,
        itemdetailsid: res.data.getOffer.itemdetailsid,
        offertype: res.data.getOffer.offertype,
        amount: res.data.getOffer.amount,
        condition: res.data.getOffer.condition,
        width: res.data.getOffer.width,
        code: res.data.getOffer.code,
      };
      tempState.offer = offer;
      this.setState({ ...tempState });
    });
  };
  fetchItemAndCategory = (itemid) => {
    let query = null;
    const variables = {
      itemid: Number(itemid),
    };

    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    query = itemAndCategory;

    fetch({
      query,
      variables,
    }).then((res) => {
      console.log(res);
      let tempState = { ...this.state };
      let submenu = {
        category: res.data.getItemAndCategory.option,
        item: res.data.getItemAndCategory.category,
      };
      tempState.submenu = submenu;
      this.setState({ ...tempState });
    });
  };
  fetchOptions = (categoryid) => {
    let query = null;
    const variables = {
      categoryid: Number(categoryid),
    };

    const fetch = createApolloFetch({
      uri: "http://localhost:4000/graphql",
    });
    query = options;

    fetch({
      query,
      variables,
    }).then((res) => {
      let tempState = { ...this.state };
      let options = res.data.options;
      tempState.options = options;
      this.setState({ ...tempState });
    });
  };
  sensorSizeHandler = (val) => {};
  photoHandler = (val) => {
    let tempState = { ...this.state };
    let keys = { ...this.state.photos.left };
    let urlArray = Object.keys(this.state.photos.left);
    urlArray.map((values, index) => {
      let v = urlArray[val];
      if (val === index) {
        tempState.photos.right.mainUrl = keys[v].photo;
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
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.openDrawer, this.state.openDrawer);
  }
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
  render() {
    return (
      <React.Fragment>
        <SideDrawer
          clicked={this.handleCover}
          show={this.state.openCover}
          openDrawer={this.state.openDrawer}
        />

        <Cover clicked={this.handleCover} show={this.state.openCover} />
        <NavigationItems clicked={this.sidebarHandler} />
        {/* <ProductAndPrice
          clicked={(val) => this.photoHandler(val)}
          sensorSizeClicked={(val) => this.sensorSizeHandler(val)}
          urlphotos={this.state.photos}
          info={this.state.photos.cameraInfo}
        /> */}
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
