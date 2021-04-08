import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p style={{ color: "red" }}>Please enter a valid value!</p>
    );
  }

  // inputClasses.push("form-control");
  inputClasses.push(classes.InputColor);
  if (props.elementType === "input") {
  }

  switch (props.elementtype) {
    case "input":
      if (props.elementname != "password") {
        inputElement = (
          <input
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementconfig}
            value={props.value}
            name={props.elementname}
            id={props.elementname}
            type={props.visibility}
          />
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
    case "radio":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
        >
          {props.value}
        </input>
      );
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
    default:
      inputElement = (
        <input
          key={props.key}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          name={props.elementname}
          id={props.elementname}
          type={props.visibility}
          onKeyPress={props.onPress}
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
