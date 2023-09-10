import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import ImageUploader from "../converter/ImageUploader";
import { Auth } from "aws-amplify";

const EditAuthor = () => {
  let history = useHistory();
  const { id } = useParams();
  const [author, setAuthor] = useState({
    name: " ",
    email: " ",
    nationality: " ",
    img: " ",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    nationality: "",
  });

  const { name, email, nationality } = author;
  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadAuthor();
  }, []);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]+ [a-zA-Z]{2,30}$/;

    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    } else if (name.length < 2 || name.length > 30) {
      formIsValid = false;
      newErrors.name = "Name must be between 2 and 30 characters";
    } else if (!nameRegEx.test(name)) {
      formIsValid = false;
      newErrors.name = "Name is not valid";
    } else {
      newErrors.name = "";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
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
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    if (validateForm()) {
      try {
        await axios.put(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors/${id}`, author, {headers: {"Authorization": `Bearer ${idToken}`,"Content-Type": "application/json"}});
        setSuccessMessage("Author updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push(`/authors/${id}`);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const loadAuthor = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    const result = await axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors/${id}`, {headers: {"Authorization": `Bearer ${idToken}`}});
    setAuthor(result.data);
  };

  return (
    <div className="container">
      {loading ? (
        <ThreeDotsLoading />
      ) : (
        <div className="w-75 mx-auto shadow p-5">
          <Link
            className="btn btn-primary"
            to={`/authors/${id}`}
            style={{
              flexGrow: "1",
              backgroundColor: "white",
              color: "#007bff",
              border: "2px solid #007bff",
            }}
          >
            Back to author
          </Link>
          <h2 className="text-center mb-4">Update: {author.name}</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
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
              <button className="buton">Update Author</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAuthor;
