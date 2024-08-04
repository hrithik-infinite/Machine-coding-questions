/* eslint-disable react/prop-types */
import React from "react";
import { CheckBox, RadioBtn, TextField } from "./FormElements";

const mapping = {
  TEXT_FIELD: TextField,
  CHECKBOX: CheckBox,
  RADIO: RadioBtn,
};
const FormField = ({ field, onChange }) => {
  const Component = mapping[field.component];
  if (Component) {
    return (
      <React.Fragment>
        <Component {...field} onChange={(value) => onChange(field.name, value)} />
      </React.Fragment>
    );
  }
  return null;
};

export default FormField;
