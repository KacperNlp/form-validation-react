import "./Input.css";

const Input = ({ name, type, label, value, onChange }) => {
  return (
    <label className="input-lable">
      <span>{label}</span>
      <input type={type} name={name} defaultValue={value} onChange={onChange} />
    </label>
  );
};

export default Input;
