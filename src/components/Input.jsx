import "./Input.css";

const Input = ({ name, type, label }) => {
  return (
    <label className="input-lable">
      <span>{label}</span>
      <input type={type} name={name} />
    </label>
  );
};

export default Input;
