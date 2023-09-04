import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import ImageUploader from "../converter/ImageUploader";
import "../styles/Add.css";

const AddAuthor = () => {
  let history = useHistory();
  const [author, setAuthor] = useState({
    name: "",
    email: "",
    nationality: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    nationality: "",
  });

  const { name, email, nationality } = author;
  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const checkNameExists = async (name) => {
    try {
      const response = await axios.get(
        `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/author?name=${name}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]+ [a-zA-Z]{2,30}$/;
    const nameExists = await checkNameExists(name);
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    } else if (name.length < 2 || name.length > 30) {
      formIsValid = false;
      newErrors.name = "Name must be between 2 and 30 characters";
    } else if (!nameRegEx.test(name)) {
      formIsValid = false;
      newErrors.name = "Name is not valid";
    } else if (nameExists) {
      formIsValid = false;
      newErrors.name = "This author already exists";
    } else {
      newErrors.name = "";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!email) {
    //   formIsValid = false;
    //   newErrors.email = "Email is required";
    /*} else*/ if (!emailRegex.test(email)) {
      formIsValid = false;
      newErrors.email = "Email is not valid";
    } else {
      newErrors.email = "";
    }

    if (!nationality.trim()) {
      formIsValid = false;
      newErrors.nationality = "Nationality is required";
    } else {
      newErrors.nationality = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors", author, {headers: {"Content-Type": "application/json"}});
        setSuccessMessage("Author added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push("/authors");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link
          className="btn btn-primary"
          to="/authors"
          style={{
            flexGrow: "1",
            backgroundColor: "white",
            color: "#007bff",
            border: "2px solid #007bff",
          }}
        >
          Back to authors
        </Link>
        <h2 className="text-center mb-4">Add A Author</h2>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {loading ? ( // If loading is true, display the loader component
          <ThreeDotsLoading />
        ) : (
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              {errors.name && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  />
                  {errors.name}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {errors.email && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  />
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Nationality"
                name="nationality"
                value={nationality}
                onChange={(e) => onInputChange(e)}
              />
              {errors.nationality && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  />
                  {errors.nationality}
                </div>
              )}
              <div className="form-group">
                <ImageUploader
                  currentImage={author.img}
                  setImage={(base64String) =>
                    setAuthor({ ...author, img: base64String })
                  }
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="buton">
                Add Author
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddAuthor;
