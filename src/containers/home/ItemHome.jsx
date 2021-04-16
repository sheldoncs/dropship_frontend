import React, { useEffect, useCallback, useState, useMemo } from "react";
import useHttp from "../../hooks/useHttp";
import { categoryQuery, offers } from "../../Query/Query";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import Offer from "../../components/offers/offers";
import { useDispatch, useSelector } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import Settings from "../../components/settings/settings";

const ItemHome = () => {
  const { handler, sendRequest } = useHttp();
  const [menuItems, setMenuItems] = useState([]);
  const [calledMenuList, setCalledMenuList] = useState(false);
  const [calledOffers, setCalledOffers] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [gifts, setGifts] = useState([]);

  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(
    useCallback(() => {
      if (user) {
        setUserInfo({
          user: { firstname: user.firstname, admin: user.admin },
        });
      }

      var handlerData = handler.filter(function (el) {
        return el.handlerType == "MENU";
      });

      if (handlerData.length > 0) {
        if (calledMenuList === false) {
          setMenuItems(handlerData[0].data.getAllCategories);
          setCalledMenuList(true);
        }
      }
    }),
    [calledMenuList, handler]
  );

  useEffect(
    useCallback(() => {
      var handlerData = handler.filter(function (el) {
        return el.handlerType == "OFFER";
      });
      if (handlerData.length > 0) {
        if (calledOffers === false) {
          setGifts(handlerData[0].data.getAllOffers);
          setCalledOffers(true);
        }
      }
    }),
    [setCalledOffers, handler]
  );

  const menuList = useCallback(() => {
    sendRequest(categoryQuery, null, "MENU");

    let handlerData = handler.filter(function (el) {
      return el.handlerType == "MENU";
    });
  }, [sendRequest, handler]);

  const giftListing = useCallback(() => {
    sendRequest(offers, null, "OFFER");
    let handlerData = handler.filter(function (el) {
      return el.handlerType == "OFFER";
    });
  }, [sendRequest, handler]);

  const navigationHandler = (catId) => {
    if (catId == 1) {
      this.props.history.push("/");
    } else {
      this.fetchAllItems(catId);
    }
  };
  const handleOffer = (id, itemid) => {};
  const menuOfItems = useMemo(() => {
    return (
      <NavigationItems
        page="home"
        onMenuList={menuList}
        clicked={(id) => navigationHandler(id)}
        menuItems={menuItems}
      />
    );
  }, [menuItems]);
  const loginSettings = useMemo(() => {
    let settings = user ? (
      <Settings count={quantity} welcome={user.firstname} />
    ) : (
      <Settings welcome="" count={quantity} />
    );
    return settings;
  });

  const setupOffers = useMemo(() => {
    const offerSearch = (
      <Offer
        giftListing={giftListing}
        gifts={gifts}
        clicked={(id, itemid) => handleOffer(id, itemid)}
      />
    );
    return offerSearch;
  }, [gifts]);
  return (
    <div>
      {loginSettings}
      {menuOfItems}
      {setupOffers}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     menu: state.menu.menu,
//     socketid: state.login.socketid,
//     clisocketid: state.login.clisocketid,
//     user: state.login.user,
//     offer: state.offer.offer,
//     order: state.orderCategory.order,
//     category: state.category.category,
//     quantity: state.orderCategory.quantity,
//     pages: state.navPages.pages,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSavePage: (page) => dispatch(actionCreators.savePage(page)),
//     onRemovePage: (page) => dispatch(actionCreators.removePage(page)),
//     onSaveClientSocketId: (socketid) =>
//       dispatch(actionCreators.saveClientSocketID(socketid)),
//     onSaveSocketId: (socketid) =>
//       dispatch(actionCreators.saveSocketID(socketid)),
//     onSaveMenu: (menu) => dispatch(actionCreators.saveMenu(menu)),
//     onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
//     onSaveCategory: (category) =>
//       dispatch(actionCreators.saveCategory(category)),
//   };
// };

export default ItemHome;
