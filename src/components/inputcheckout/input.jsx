import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  const radioClasses = [classes.RadioInputElement];
  radioClasses.push(classes.Radio);
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p style={{ color: "red" }}>Please enter a valid value!</p>
    );
  }

  inputClasses.push("form-control");
  inputClasses.push(classes.InputColor);
  if (props.elementType === "input") {
  }

  switch (props.elementType) {
    case "input":
      if (props.elementName != "password") {
        console.log("elementConfig", props.elementConfig);
        inputElement = (
          <div className="input-container">
            <input
              onChange={props.changed}
              className={inputClasses.join(" ")}
              {...props.elementConfig}
              value={props.value}
              name={props.elementName}
              id={props.elementName}
              type={props.visibility}
            />
          </div>
        );
      } else {
        inputElement = (
          <input
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            name={props.elementName}
            id={props.elementName}
          />
        );
      }
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join()}
          {...props}
        />
      );
      break;
    case "select":
      if (props.elementconfig !== undefined) {
        inputElement = (
          <select onChange={props.changed} className={classes.Select}>
            {props.elementconfig.selectoptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
          </select>
        );
      }
      break;
    case "radio":
      inputElement = (
        <div className={classes.RadioContainer}>
          <div className="pt-2">
            <input
              onChange={props.changed}
              className={radioClasses.join(" ")}
              {...props.elementConfig}
              value={props.dispValue}
              name={props.name}
              id={props.elementName}
            />
          </div>
          <div className="mt-2">
            <img src={props.icon} />
          </div>
          <div className="ml-5 pt-3">{props.dispValue}</div>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          key={props.key}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
          type={props.visibility}
        />
      );
  }

  return (
    <div className={inputClasses}>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
