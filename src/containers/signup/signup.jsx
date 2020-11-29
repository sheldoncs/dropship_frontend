import React, { Component } from "react";
import Input from "../../components/input/input";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Button from "../../components/button/default/button";
import classes from "./Signup.module.css";
import Logo from "../../assets/largelogo.png";

class Signup extends Component {
  state = {
    signupForm: {
      firstname: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "First Name" },
        value: "",
        validation: {
          required: true,
        },
        exist: false,
        valid: false,
        touched: false,
        regExpression: /^[A-Za-z][A-Za-z_0-9]*$/,
      },
      lastname: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "Last Name" },
        value: "",
        validation: {
          required: true,
        },
        exist: false,
        valid: false,
        touched: false,
        regExpression: /^[A-Za-z][A-Za-z_0-9]*$/,
      },
      email: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "email" },
        value: "",
        validation: {
          required: true,
        },
        exist: false,
        valid: false,
        touched: false,
        regExpression: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      password: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "password", placeholder: "Password" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        exist: false,
        regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "Password Sample Format:Robin@25",
      },
    },
    hasAuthenticated: false,
    isRegistering: false,
    saveActivated: false,
    mounted: false,
  };

  inputChangeHandler = (event, inputIdentifier) => {
    /*Cloned*/

    const updatedOrderForm = { ...this.state.signupForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    const currentState = { ...this.state };
    currentState.saveActivated = false;
    /*Cloned*/

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.regExpression
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
        firstname: updatedOrderForm["firstname"].value,
        lastname: updatedOrderForm["lastname"].value,
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
  checkValidity(value, rules, regex) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minlength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxlength && isValid;
    }

    const testExpress = new RegExp(regex);
    let regexValid = testExpress.test(value);
    isValid = regexValid && isValid;

    return isValid;
  }
  signupHandler = (event) => {
    event.preventDefault();
  };
  render() {
    let message = null;
    if (!this.state.hasAuthenticated && this.state.saveActivated) {
      message = "Invalid User!";
    }
    const formElementsArray = [];
    for (let key in this.state.signupForm) {
      formElementsArray.push({ id: key, config: this.state.signupForm[key] });
    }

    let loginForm = formElementsArray.map((pairs) => {
      return (
        <React.Fragment key={pairs.id}>
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
      <div>
        <div className={classes.Signup}>
          <div
            style={{
              paddingTop: "15px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={Logo} />
            <div style={{ paddingLeft: "40%" }}>
              <span className={classes.SignupText}>SIGN UP</span>
            </div>
          </div>
          <form onSubmit={this.signupHandler}>
            {loginForm}
            <div>
              <Button>Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    );
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
