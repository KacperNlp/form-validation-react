import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

import "./Form.css";

const Form = () => {
  const [formElements, setFormElements] = useState([]);

  useEffect(() => {
    fetch("./form.json")
      .then((response) => {
        if (response.status !== 200) throw new Error("We cannot get Data");
        return response.json();
      })
      .then((data) => {
        setFormElements(data.form);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const formStructure = formElements.map(({ name, type, label, id }) => (
    <Input key={id} name={name} type={type} label={label} />
  ));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submit form");
  };

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
