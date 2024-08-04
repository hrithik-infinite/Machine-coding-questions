import "./App.css";
import ConfigForm from "./components/ConfigForm";
import * as yup from "yup";
function App() {
  const schema = [
    {
      component: "TEXT_FIELD",
      name: "name",
      label: "First Name",
      isRequired: true,
      validate: yup.string().required("First Name is required"),
      type: "text",
    },
    {
      component: "TEXT_FIELD",
      name: "email",
      label: "Email",
      isRequired: true,
      validate: yup.string().email("Invalid Email Address").required("Email is required"),
      type: "email",
    },
    {
      component: "TEXT_FIELD",
      name: "password",
      label: "Password",
      isRequired: true,
      validate: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
      type: "password",
    },
    {
      component: "TEXT_FIELD",
      name: "confirmPassword",
      label: "Confirm Password",
      isRequired: true,
      validate: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      type: "password",
    },
    {
      component: "TEXT_FIELD",
      name: "birthDate",
      label: "Birth Date",
      isRequired: true,
      validate: yup.date().required("Birth Date is required").nullable(),
      type: "date",
    },
    {
      component: "TEXT_FIELD",
      name: "age",
      label: "Age",
      isRequired: true,
      validate: yup.number().required("Age is required").min(0, "Age must be a positive number"),
      type: "number",
    },
    {
      component: "CHECKBOX",
      name: "agreeToTerms",
      label: "I agree to the terms and conditions",
      isRequired: true,
      validate: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
      type: "checkbox",
    },
    {
      component: "RADIO",
      name: "gender",
      label: "Gender",
      isRequired: true,
      validate: yup.string().required("Gender is required"),
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      type: "radio",
    }
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="App">
      <h1>Config Driven Form</h1>
      <ConfigForm schema={schema} onSubmit={onSubmit} />
    </div>
  );
}

export default App;
