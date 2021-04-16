import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Contact from "./containers/contact/contact";
import Signup from "./containers/signup/signup";
// import Home from "./containers/home/home";
import Home from "./containers/home/ItemHome";
import Features from "./containers/features/features";
import Product from "./containers/productPage/productPage";
import Login from "./containers/login/login";
import ForgotPassword from "./containers/forgotPassword/forgotPassword";
import AdminChat from "./containers/adminChat/adminChat";
import PreviewOrder from "./containers/previewOrders/previewOrders";
import Checkout from "./containers/checkout/checkout";
import Payment from "./containers/creditCard/creditCard";
import PaymentCard from "./containers/paymentcard/paymentcard";

function App() {
  return (
    <div className={classes.Bgrnd}>
      <Switch>
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/productpage" component={Product} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/adminChat" component={AdminChat} />
        <Route exact path="/previeworder" component={PreviewOrder} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={PaymentCard} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
