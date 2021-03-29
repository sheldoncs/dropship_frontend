import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import ApolloBoost from "apollo-boost";
import menuReducer from "./store/menuReducer";
import loginReducer from "./store/loginReducer";
import offerReducer from "./store/offerReducer";
import categoryReducer from "./store/categoryReducer";
import orderCategoryReducer from "./store/orderCategoryReducer";
import pageNavigateReducer from "./store/pageNavigateReducer";
import quantityReducer from "./store/quantityReducer";
import identityReducer from "./store/identityReducer";

const client = new ApolloBoost({
  uri: " http://localhost:5000/graphql",
  // uri: "http://wizzywigs.com:5000",
});

const rootReducer = combineReducers({
  menu: menuReducer,
  login: loginReducer,
  offer: offerReducer,
  orderCategory: orderCategoryReducer,
  category: categoryReducer,
  quantity: quantityReducer,
  navPages: pageNavigateReducer,
  identity: identityReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
