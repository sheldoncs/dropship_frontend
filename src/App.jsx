import classes from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Contact from "./containers/contact/contact";
import Signup from "./containers/signup/signup";
import Home from "./containers/home/home";
import Features from "./containers/features/features";
import Purchase from "./containers/productPage/productPage";
import Login from "./containers/login/login";
import ForgotPassword from "./containers/forgotPassword/forgotPassword";

function App() {
  return (
    <div className={classes.Bgrnd}>
      <Switch>
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/purchase" component={Purchase} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
