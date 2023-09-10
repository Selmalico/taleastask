import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import GenreSelect from "./GenreSelect";
import ImageUploader from "../converter/ImageUploader";
import "../styles/Add.css";
import { Auth } from "aws-amplify";

const AddBook = ({isNightMode}) => {
  let history = useHistory();
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    rating: "",
    votes: "",
    genreIds: [],
    img: "",
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    price: "",
    rating: "",
    votes: "",
    genreIds: "",
  });

  const { title, author, price, rating, votes, genreIds, img } = book;

  useEffect(() => {
    loadAuthors();
    loadGenres();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await axios.get("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGenres = async () => {
    try {
      const response = await axios.get("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/genres");
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const checkTitleExists = async (title) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/book?title=${title}`
  //     );
  //     return response.data.length > 0;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validate title
    // const titleExists = await checkTitleExists(title);
    if (!title.trim()) {
      formIsValid = false;
      newErrors.title = "Title is required";
    } else if (title.length < 2 || title.length > 30) {
      formIsValid = false;
      newErrors.title = "Title must be between 2 and 30 characters";
    // } else if (titleExists) {
    //   formIsValid = false;
    //   newErrors.title = "This title already exists";
    // } 
    }else {
      newErrors.title = "";
    }

    // Validate author
    if (!author) {
      formIsValid = false;
      newErrors.author = "Author is required";
    } else {
      newErrors.author = "";
    }

    // Validate genres
    if (genreIds.length === 0) {
      formIsValid = false;
      newErrors.genreIds = "Please select at least one genre";
    } else {
      newErrors.genreIds = "";
    }

    // Validate price
    if (
      isNaN(parseFloat(price)) ||
      parseFloat(price) < 5 ||
      parseFloat(price) > 1000
    ) {
      formIsValid = false;
      newErrors.price = "Price must be a number between 5 and 1000";
    } else {
      newErrors.price = "";
    }

    // Validate rating
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
      formIsValid = false;
      newErrors.rating = "Rating must be a number between 1 and 10 ";
    } else {
      newErrors.rating = "";
    }

    // Validate votes
    if (isNaN(parseInt(votes)) || parseInt(votes) < 0) {
      formIsValid = false;
      newErrors.votes = "Votes must be a non-negative integer";
    } else {
      newErrors.votes = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const onAuthorSelect = (e) => {
    setBook({ ...book, author: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      author: "",
    }));
  };

  const onGenresSelect = (selectedGenres) => {
    setBook({ ...book, genreIds: selectedGenres });
    setErrors((prevErrors) => ({
      ...prevErrors,
      genreIds: "",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    if (validateForm()) {
      try {
        const selectedGenres = genres
          .filter((genre) => book.genreIds.includes(genre.name))
          .map((genre) => genre._id);
        const bookData = {
          ...book,
          genreIds: selectedGenres,
        };
        console.log(bookData);
        await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/books", bookData, {headers: {"Authorization":`Bearer ${idToken}`,"Content-Type": "application/json"}});
        setSuccessMessage("Book added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push("/");
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container w-75 shadow p-5">
      <Link
        className="btn btn-primary"
        to="/"
        style={{
          flexGrow: "1",
          backgroundColor: "white",
          color: "#007bff",
          border: "2px solid #007bff",
        }}
      >
        Back to Books
      </Link>
      <h2 className="text-center mb-4">Add A Book</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {loading ? (
        <ThreeDotsLoading />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={onInputChange}
              style={{backgroundColor: isNightMode ? "#1e1d23" : "#fff",
              color: isNightMode ? "white" : "black",}}
            />
            {errors.title && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.title}
              </div>
            )}
          </div>
          <div className="form-group">
            <select
              className="form-control form-control-lg"
              name="author"
              value={author}
              onChange={onAuthorSelect}
            >
              <option value="" disabled>
                Select an Author
              </option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.author && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.author}
              </div>
            )}
          </div>
          <div className="form-group">
            <GenreSelect
              className="form-control form-control-lg"
              genres={genres}
              selectedGenres={genreIds}
              setSelectedGenres={onGenresSelect}
            />
            {errors.genreIds && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.genreIds}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Price"
              name="price"
              value={price}
              onChange={onInputChange}
            />
            {errors.price && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.price}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Rating"
              name="rating"
              value={rating}
              step={0.1}
              onChange={onInputChange}
            />
            {errors.rating && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.rating}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Votes"
              name="votes"
              value={votes}
              onChange={onInputChange}
            />
            {errors.votes && (
              <div className="error-message">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "#ff0000" }}
                />
                {errors.votes}
              </div>
            )}
          </div>
          <div className="form-group">
            <ImageUploader
              currentImage={book.img}
              setImage={(base64String) =>
                setBook({ ...book, img: base64String })
              }
            />
          </div>
          <div className="text-center">
            <button type="submit" className="buton">
              Add Book
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddBook;
