import React, { Component } from "react";

import Input from "../../components/input/input";
import classes from "../../components/input/input.module.css";
import Button from "../../components/button/default/button";
import NewAccountButton from "../../components/button/newAccount/button";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import NavigationItem from "../../components/textNavigationItem/textNavigationItem";
import Settings from "../../components/settings/settings";
import Footer from "../../components/footer/footer";
import logo from "../../assets/user.png";
import ComponentMessage from "../../components/message/message";
import GoogleLogin from "react-google-login";
import GoogleLogo from "../../assets/GoogleLogo.png";
import Logo from "../../assets/largelogo.png";
import GoogleButton from "../../components/button/google/button";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import Cover from "../../components/cover/cover";
import Message from "../../components/errorMessage/errorMessage";
import { creatUser } from "../../Mutation/Mutation";
import { createApolloFetch } from "apollo-fetch";
import { categoryQuery } from "../../Query/Query";
import fetch from "../../fetchservice/fetchservice";

class Login extends Component {
  state = {
    loginForm: {
      email: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "email" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        exist: false,
        valid: false,
        touched: false,
        // regExpression: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      password: {
        elementtype: "input",
        elementConfig: { type: "password", placeholder: "password" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "Password Sample Format:Robin@25",
      },
    },
    hasAuthenticated: false,
    isRegistering: false,
    saveActivated: false,
    mounted: false,
    showError: false,
    showCover: false,
    message: "",
    user: null,
    menu: null,
  };
  authorizeHandler = (auth) => {};
  buttonHandler = (auth) => {
    let currentState = { ...this.state };
    currentState.hasAuthenticated = auth;

    currentState.saveActivated = true;
    this.setState({
      hasAuthenticated: currentState.hasAuthenticated,
      saveActivated: currentState.saveActivated,
    });
  };

  navigationHandler = (option) => {
    const updatedOrderForm = { ...this.state.loginForm };
    if (option === "register") {
      this.props.onRegistering(true, "hidden", "hidden");
      updatedOrderForm.email.visibility = "visible";
    } else {
      this.props.onRegistering(false, "visible", "visible");
      updatedOrderForm.email.visibility = "hidden";
    }
    this.setState({ loginForm: updatedOrderForm });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    /*Cloned*/

    const updatedOrderForm = { ...this.state.loginForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    const currentState = { ...this.state };
    currentState.saveActivated = false;
    /*Cloned*/

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.minLen
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    let isRegistering = updatedFormElement.isRegistering;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.props.onLoginFormIsValid(formIsValid);
    let credObj = null;

    if (formIsValid) {
      credObj = {
        username: updatedOrderForm["email"].value,
        password: updatedOrderForm["password"].value,
        email: updatedOrderForm["email"].value,
      };

      this.props.onSaveCredentials(credObj);
    }
    this.setState({
      loginForm: updatedOrderForm,
      formIsValid: formIsValid,
      saveActivated: currentState.saveActivated,
    });
  };
  checkValidity(value, rules, minLen) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxlength && isValid;
    }

    // const testExpress = new RegExp(regex);
    // let regexValid = testExpress.test(value);
    // isValid = regexValid && isValid;

    return isValid;
  }
  componentDidMount() {
    if (this.props.menu != null) {
      let tempMenu = this.props.menu;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      this.setState({ menu: filteredMenu });
    } else {
      this.fetchMenuQuery();
    }
    let currentState = { ...this.state };
    currentState.mounted = true;
    this.setState({ mounted: currentState.mounted });
  }
  fetchMenuQuery = () => {
    let query = categoryQuery;

    fetch({
      query,
    }).then((res) => {
      let tempMenu = res.data.getAllCategories;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      this.setState({ menu: filteredMenu });
    });
  };
  googleHandler = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    fetch("http://localhost:8080/auth/google")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  newAccountHandler = () => {
    this.props.history.push("/signup");
  };
  loginHandler = (event) => {
    event.preventDefault();

    if (this.state.loginForm.email.value) {
      let data = {
        username: this.state.loginForm.email.value,
        password: this.state.loginForm.password.value,
      };

      fetch("https://heroku-seller-app.herokuapp.com/login", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.status !== 401) {
            this.setState({ showError: false, showCover: false, message: "" });

            response.json().then((result) => {
              if (result.auth === true) {
                this.props.onSetToken(result.token);
                // localStorage.setItem("token", result.token);
                // localStorage.setItem("email", this.state.loginForm.email.value);

                let userObject = {
                  username: this.state.loginForm.email.value,
                  email: this.state.loginForm.email.value,
                  password: "",
                  firstname: result.firstname,
                  lastname: result.lastname,
                  addr1: "",
                  addr2: "",
                  zip: "",
                  country: "",
                  isGoogle: 0,
                  admin: result.admin,
                };

                this.props.onSaveUser(userObject);
                this.props.onLoginAuthenticated(
                  result.auth,
                  this.state.loginForm.email.value
                );
                this.setState({
                  hasAuthenticated: true,
                  showError: true,
                  showCover: true,
                  message: "Welcome " + userObject.firstname,
                });
                // this.props.history.push("/");
              }
            });
          } else {
            this.setState({
              showError: true,
              showCover: true,
              message: "Invalid Login",
            });
          }
        })
        .catch((error) => console.log("Error:", error));
    }
  };
  responseGoogle = (response) => {
    const uri = "https://heroku-seller-app.herokuapp.com/graphql";

    let query = creatUser;

    const variables = {
      username: response.profileObj.email,
      email: response.profileObj.email,
      password: "",
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      addr1: "",
      addr2: "",
      zip: "",
      country: "",
      isGoogle: 1,
      admin: 0,
    };

    this.props.onSaveUser(variables);

    const apolloFetch = createApolloFetch({ uri });

    apolloFetch({ query, variables })
      .then((resp) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  errorHandler = () => {
    let tempState = { ...this.state };
    tempState.showCover = !this.state.showCover;
    tempState.showError = !this.state.showError;
    this.setState({ ...tempState });
  };
  navigationHandler = (catId) => {
    if (catId == 1) {
      this.props.history.push("/");
    }
  };
  render() {
    // if (!this.state.mounted) {
    let signInText = "Sign In";
    let divider = null;
    let message = null;

    const formElementsArray = [];
    let dividerClasses = [classes.or];

    if (this.props.google == "visible") {
      dividerClasses.push(classes.ShowDivider);
    } else if (this.props.google == "hidden") {
      dividerClasses.push(classes.HideDivider);
      signInText = "Register";
    }
    divider = <div className={dividerClasses.join(" ")}>--or--</div>;

    for (let key in this.state.loginForm) {
      formElementsArray.push({ id: key, config: this.state.loginForm[key] });
    }

    let loginForm = formElementsArray.map((pairs) => {
      return (
        <React.Fragment key={pairs.id}>
          <Cover show={this.state.showCover} clicked={this.errorHandler} />
          <Message
            clicked={this.errorHandler}
            show={this.state.showCover}
            showError={this.state.showError}
          >
            {this.state.message}
          </Message>
          <div key={pairs.id}>
            <Input
              key={pairs.id}
              changed={(event) => {
                this.inputChangeHandler(event, pairs.id);
              }}
              visibility={pairs.config.visibility}
              elementType={pairs.config.elementtype}
              elementConfig={pairs.config.elementConfig}
              elementName={pairs.id}
            />
          </div>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        {this.props.user != null ? (
          <Settings welcome={this.props.user.firstname} />
        ) : (
          <Settings welcome="" />
        )}
        <NavigationItems
          menuItems={this.state.menu}
          page="login"
          clicked={(id) => this.navigationHandler(id)}
        />
        <div className={classes.Container}>
          <div className={classes.Logo}>
            <img src={Logo} />
            <div style={{ margin: "auto", width: "290px" }}>
              Connect With Us
            </div>
          </div>

          <form className={classes.Input} onSubmit={this.loginHandler}>
            <div>
              <div>
                <ComponentMessage>{message}</ComponentMessage>
              </div>
              {loginForm}
              <div className={classes.buttonContainer}>
                <Button
                  clicked={this.buttonHandler}
                  credentials={this.props.credentials}
                  newAccount={false}
                  formisvalid={this.props.formIsValid}
                >
                  {signInText}
                </Button>

                <GoogleLogin
                  clientId="1076347778313-cgj600tkvh7h0v0iafmlg1nr0pcpeqhs.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      style={{ width: "300px", marginTop: "20px" }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="btn btn btn-outline-primary"
                    >
                      <img src={GoogleLogo} />
                      Login
                    </button>
                  )}
                  buttonText="GOOGLE Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                <NewAccountButton
                  clicked={this.newAccountHandler}
                  newAccount={true}
                >
                  <div className="text-center">Create New Account</div>
                </NewAccountButton>
                {/* <GoogleButton clicked={this.googleHandler}>
                  Google Login
                </GoogleButton> */}
                <div style={{ width: "140px", margin: "10px auto" }}>
                  <NavigationItem link="/forgot" forgotPassword={true}>
                    Forgot Password?
                  </NavigationItem>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
    // }
  }
}
const mapStateToProps = (state) => {
  return {
    credentials: state.login.credentials,
    formIsValid: state.login.formIsValid,
    loginAuthenticated: state.login.loginAuthenticated,
    isRegistering: state.login.isRegistering,
    facebook: state.login.facebook,
    google: state.login.google,
    menu: state.menu.menu,
    user: state.login.user,
    token: state.login.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetToken: (token) => dispatch(actionCreators.setToken(token)),
    onSaveUser: (user) => dispatch(actionCreators.saveUser(user)),
    onSaveCredentials: (saveCreds) =>
      dispatch(actionCreators.saveCredentials(saveCreds)),
    onLoginFormIsValid: (isValid) =>
      dispatch(actionCreators.loginFormIsValid(isValid)),
    onLoginAuthenticated: (isAuth, username) =>
      dispatch(actionCreators.loginAuthenticated(isAuth, username)),
    onRegistering: (isRegistering, facebookVisible, googleVisible) =>
      dispatch(
        actionCreators.formIsRegistering(
          isRegistering,
          facebookVisible,
          googleVisible
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
