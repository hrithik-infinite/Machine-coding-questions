/* eslint-disable react/prop-types */

const TextField = ({ name, label, isRequired, type, onChange }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input type={type} onBlur={handleBlur}></input>
    </div>
  );
};

const CheckBox = ({ name, label, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <input type="checkbox" onChange={(e) => onChange(e.target.checked)}></input>
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>
    </div>
  );
};

const RadioBtn = ({ name, label, options, isRequired, onChange }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {isRequired && <span>*</span>}
      </label>
      {options.map((option) => (
        <div className="inputContainer" key={option.value}>
          <input type="radio" name={name} value={option.value} onChange={(e) => onChange(e.target.checked)} />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export { TextField, CheckBox, RadioBtn };
