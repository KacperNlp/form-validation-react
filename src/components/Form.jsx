import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

import "./Form.css";

const Form = () => {
  const [formElements, setFormElements] = useState([]);
  const [formProps, setFormProps] = useState();

  const generateStateObject = (data) => {
    const allKeys = data.map(({ name }) => name);
    const newformProps = {};
    allKeys.forEach((name) => (newformProps[name] = ""));
    setFormProps(newformProps);
  };

  useEffect(() => {
    fetch("./form.json")
      .then((response) => {
        if (response.status !== 200) throw new Error("We cannot get Data");
        return response.json();
      })
      .then((data) => {
        setFormElements(data.form);
        generateStateObject(data.form);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submit form");
  };

  const handleOnInputChange = (e) => {
    const { value, name } = e.target;
    setFormProps((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formStructure = formElements.map(({ name, type, label, id }) => (
    <Input
      key={id}
      name={name}
      type={type}
      label={label}
      value={formProps[name]}
      onChange={handleOnInputChange}
    />
  ));

  return (
    <form action="post" className="form" noValidate onSubmit={handleFormSubmit}>
      <div className="form-inputs">
        {!!formStructure.length && formStructure}
      </div>
      <label className="form-checkbox">
        <input type="checkbox" />
        <span>I read the statute and agree with it!</span>
      </label>
      <Button text="Register" />
    </form>
  );
};

export default Form;
