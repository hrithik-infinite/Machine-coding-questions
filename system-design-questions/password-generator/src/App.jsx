import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    length: "",
    specialChar: false,
    lowerCase: false,
    upperCase: false,
    numbers: false
  });
  const [password, setPassword] = useState("");
  const upperCaseArr = [...Array(26)].map((_, i) => String.fromCharCode("A".charCodeAt() + i));
  const lowerCaseArr = [...Array(26)].map((_, i) => String.fromCharCode("a".charCodeAt() + i));
  const numbersArr = [...Array(10)].map((_, i) => i.toString());
  const specialCharArr = "@#$%^&*()".split("");
  const generate = (event) => {
    event.preventDefault();
    setPassword("");
    const pswdArr = [];
    const { specialChar, lowerCase, upperCase, numbers } = formData;
    let { length } = formData;
    if (specialChar) pswdArr.push(specialCharArr);
    if (lowerCase) pswdArr.push(lowerCaseArr);
    if (upperCase) pswdArr.push(upperCaseArr);
    if (numbers) pswdArr.push(numbersArr);
    if (!specialChar && !lowerCase & !upperCase && !numbers) {
      pswdArr.push(numbersArr);
    }
    const finalCharList = pswdArr.flat();
    let strFinalPswd = "";
    for (let i = 0; i < length; i++) {
      strFinalPswd += finalCharList[Math.floor(Math.random() * finalCharList.length)];
    }
    setPassword(strFinalPswd);
  };

  const onChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  return (
    <div className="app">
      <h1>Password Generator</h1>
      <div className="form-section">
        <form onSubmit={generate}>
          <div className="form-group">
            <label htmlFor="length">Password Length:</label>
            <input type="number" id="length" name="length" min="5" max="50" placeholder="Enter length (5-50)" required onChange={onChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="specialChar">Special Characters</label>
            <input type="checkbox" name="specialChar" onChange={onChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="lowerCase">LowerCase</label>
            <input type="checkbox" name="lowerCase" onChange={onChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="upperCase">UpperCase</label>
            <input type="checkbox" name="upperCase" onChange={onChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="numbers">Numbers</label>
            <input type="checkbox" name="numbers" onChange={onChange}></input>
          </div>
          <button type="submit">Generate Password</button>
        </form>
        <div className="pswd">{password}</div>
      </div>
    </div>
  );
}

export default App;
