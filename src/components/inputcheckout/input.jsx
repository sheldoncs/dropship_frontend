import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputElement = null;
  let selectClass = [classes.Select];
  selectClass.push(classes.select_category);
  selectClass.push(classes.white_select);
  const inputClasses = [classes.InputElement];
  const radioClasses = [classes.RadioInputElement];
  radioClasses.push(classes.Radio);

  if (!props.valid) {
    inputClasses.push(classes.Invalid);
  } else {
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
      if (props.elementConfig !== undefined) {
        inputElement = (
          <select onChange={props.changed} className={classes.Select}>
            {props.elementConfig.selectoptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayvalue}
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
