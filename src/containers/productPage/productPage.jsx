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

class ProductPage extends Component {
  state = {
    photos: {
      left: {
        url1: { index: 0, photo: IntroPhoto },
        url2: { index: 1, photo: MotionDetectorPhoto },
        url3: { index: 2, photo: NightVisionPhoto },
        url4: { index: 3, photo: OpticalZoomPhoto },
        url5: { index: 4, photo: CardStoragePhoto },
      },
      right: { mainUrl: IntroPhoto },
      cameraInfo: {
        sensorSize: {
          size1: {
            size: "1080 No SD Card",
            plug: {
              labelEU: { label: "EU", price: "75.99" },
              labelUS: { label: "US", price: "75.99" },
              labelAU: { label: "AU", price: "75.99" },
              labelUK: { label: "UK", price: "60.99" },
            },
          },
          size2: {
            size: "1080P Add 32G Card",
            plug: {
              labelEU: { label: "EU", price: "86.49" },
              labelUS: { label: "US", price: "86.49" },
              labelAU: { label: "AU", price: "86.49" },
              labelUK: { label: "UK", price: "86.49" },
            },
          },
          size3: {
            size: "1080P Add 64G Card",
            plug: {
              labelEU: { label: "EU", price: "94.99" },
              labelUS: { label: "US", price: "94.99" },
              labelAU: { label: "AU", price: "94.99" },
              labelUK: { label: "UK", price: "94.99" },
            },
          },
          size4: {
            size: "1080P Add 128G Card",
            plug: {
              labelEU: { label: "EU", price: "128.99" },
              labelUS: { label: "US", price: "128.99" },
              labelAU: { label: "AU", price: "128.99" },
              labelUK: { label: "UK", price: "128.99" },
            },
          },
          sensorSelected: "",
          sensorPrice: 0,
        },
      },
    },
    openDrawer: false,
    openCover: false,
    showError: true,
  };
  conponentDidMount() {
    let tempState = { ...this.state };
    tempState.photos.cameraInfo.sensorSelected =
      tempState.photos.cameraInfo.SensorSize.size1;
    tempState.photos.cameraInfo.sensorPrice =
      tempState.photos.cameraInfo.SensorSize.size1.plug.labelUS.price;

    this.setState({ ...tempState });
  }
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
        <ProductAndPrice
          clicked={(val) => this.photoHandler(val)}
          sensorSizeClicked={(val) => this.sensorSizeHandler(val)}
          urlphotos={this.state.photos}
          info={this.state.photos.cameraInfo}
        />
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
