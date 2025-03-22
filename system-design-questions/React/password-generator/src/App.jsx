import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    length: "",
    specialChar: true,
    lowerCase: true,
    upperCase: true,
    numbers: true
  });
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseInt(value) || ""
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const upperCaseArr = [...Array(26)].map((_, i) => String.fromCharCode("A".charCodeAt() + i));
    const lowerCaseArr = [...Array(26)].map((_, i) => String.fromCharCode("a".charCodeAt() + i));
    const numbersArr = [...Array(10)].map((_, i) => i.toString());
    const specialCharArr = "@#$%^&*()".split("");

    let { specialChar, lowerCase, upperCase, numbers, length } = formData;
    length = parseInt(length, 10) || 10;

    const pswdArr = [];
    if (specialChar) pswdArr.push(...specialCharArr);
    if (lowerCase) pswdArr.push(...lowerCaseArr);
    if (upperCase) pswdArr.push(...upperCaseArr);
    if (numbers) pswdArr.push(...numbersArr);

    if (pswdArr.length === 0) pswdArr.push(...numbersArr);

    const password = Array.from({ length }, () => pswdArr[Math.floor(Math.random() * pswdArr.length)]).join("");

    setPassword(password);
    console.log(password);
  };

  return (
    <div className="app">
      <h1>Password Generator</h1>
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="length">Password Length:</label>
          <input type="number" id="length" name="length" min="10" max="50" placeholder="Enter length (10-50)" required value={formData.length} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="specialChar">Special Characters</label>
          <input type="checkbox" id="specialChar" name="specialChar" checked={formData.specialChar} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lowerCase">Lower Case</label>
          <input type="checkbox" id="lowerCase" name="lowerCase" checked={formData.lowerCase} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="upperCase">Upper Case</label>
          <input type="checkbox" id="upperCase" name="upperCase" checked={formData.upperCase} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="numbers">Numbers</label>
          <input type="checkbox" id="numbers" name="numbers" checked={formData.numbers} onChange={onChange} />
        </div>
        <button type="submit">Generate Password</button>
      </form>
      {password && (
        <div className="password-display">
          <p>{password}</p>
        </div>
      )}
    </div>
  );
}

export default App;
