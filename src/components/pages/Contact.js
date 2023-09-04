import React, { useState } from "react";
import "../styles/Add.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [problem, setProblem] = useState({
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  })
  
  const {email, message} = problem;
  const onInputChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
    }));
  };

  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      formIsValid = false;
      newErrors.email = "Email is not valid!";
    } else {
      newErrors.email = "";
    }

    if(!message){
      formIsValid = false;
      newErrors.message = "You need to provide a provide a message!";
    } else {
      newErrors.message = "";
    }

    setErrors(newErrors);
    return formIsValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/contact", problem);
        setSuccessMessage("Thank you for letting us know! ");
        setTimeout(() => {
          setSuccessMessage("");
          // history.push("/");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="container" style={{height: "74vh"}}>
      <div className="py-4">
        <h1>Contact Page</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              name="email"
              onChange={onInputChange}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {errors.email && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  />
                  {errors.email}
                </div>)}
          </div>
          <div class="form-group">
            <label for="description">Describe your problem!</label>
            <textarea
              rows={4}
              class="form-control"
              id="description"
              value={message}
              name="message"
              onChange={onInputChange}
            />
            {errors.message && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  />
                  {errors.message}
                </div>)}
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" style={{position:"inherit"}}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
