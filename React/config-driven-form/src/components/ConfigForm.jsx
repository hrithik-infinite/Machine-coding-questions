import React, { useState } from "react";
import FormField from "./FormField";

const ConfigForm = ({ schema = [], onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field, index) => (
        <FormField key={index} field={{ ...field, error: errors[field.name] }} value={formData[field.name] || ""} onChange={handleChange} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConfigForm;
