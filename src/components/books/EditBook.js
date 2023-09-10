import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import GenreSelect from "./GenreSelect";
import ImageUploader from "../converter/ImageUploader";
import { Auth } from "aws-amplify";

const EditBook = () => {
  let history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genreIds: [],
    price: "",
    rating: "",
    votes: "",
    img: null,
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
    genreIds: [],
  });

  const { title, author, genreIds, price, rating, votes } = book;

  useEffect(() => {
    loadAuthors();
    loadGenres();
    loadBook();
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

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    // Validate title
    if (!title.trim()) {
      formIsValid = false;
      newErrors.title = "Title is required";
    } else if (title.length < 2 || title.length > 30) {
      formIsValid = false;
      newErrors.title = "Title must be between 2 and 30 characters";
    } else {
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
    if (!book.genreIds || book.genreIds.length === 0) {
      formIsValid = false;
      newErrors.genreIds = "Please select at least one genre";
    } else {
      newErrors.genreIds = "";
    }

    // Validate price
    const parsedPriced = parseFloat(price);
    if (!book.price) {
      formIsValid = false;
      newErrors.price = "Price is required";
    } else if (isNaN(parsedPriced) || parsedPriced < 5 || parsedPriced > 1000) {
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
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onAuthorSelect = (e) => {
    const selectedAuthorId = e.target.value;
    const selectedAuthor = authors.find(
      (author) => author._id === selectedAuthorId
    );
    setBook({ ...book, author: selectedAuthor });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const selectedGenres = genres
          .filter((genre) => book.genreIds.includes(genre.name))
          .map((genre) => genre._id);

        const bookData = {
          title: book.title,
          author: book.author._id,
          genreIds: selectedGenres,
          price: book.price,
          rating: book.rating,
          votes: book.votes,
          img: book.img,
        };
        console.log(bookData);
        const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
        await axios.put(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/books/${id}`, bookData, {headers: {"Authorization": `Bearer ${idToken}`,"Content-Type": "application/json"}});
        setSuccessMessage("Book updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push(`/books/${id}`);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onGenresSelect = (selectedGenres) => {
    setBook({ ...book, genreIds: selectedGenres });
    setErrors((prevErrors) => ({
      ...prevErrors,
      genreIds: "",
    }));
  };

  const loadBook = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    const result = await axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/books/${id}`, {headers: {"Authorization": `Bearer ${idToken}`}});
    const { title, author, genreIds, price, rating, votes } = result.data;
    setBook({ title, author, genreIds, price, rating, votes });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link
          className="btn btn-primary"
          to={`/books/${id}`}
          style={{
            flexGrow: "1",
            backgroundColor: "white",
            color: "#007bff",
            border: "2px solid #007bff",
          }}
        >
          Back to book
        </Link>
        <h2 className="text-center mb-4">Update {book.title}</h2>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {loading ? (
          <ThreeDotsLoading />
        ) : (
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
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
                value={author._id} // Use author._id as the value to correctly select the option
                onChange={(e) => onAuthorSelect(e)}
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
                selectedGenres={book.genreIds || []}
                setSelectedGenres={onGenresSelect}
              />
              {errors.genreIds && (
                <div className="error-message">
                  {/* <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "#ff0000" }}
                  /> */}
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
                onChange={(e) => onInputChange(e)}
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
                step={0.1}
                className="form-control form-control-lg"
                placeholder="Enter Rating"
                name="rating"
                value={rating}
                onChange={(e) => onInputChange(e)}
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
                min={0}
                className="form-control form-control-lg"
                placeholder="Enter Votes"
                name="votes"
                value={votes}
                onChange={(e) => onInputChange(e)}
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
              <div className="form-group">
              <ImageUploader
              currentImage={book.img}
              setImage={(base64String) =>
                setBook({ ...book, img: base64String })
              }
            />
              </div>
            </div>
            <div className="text-center">
              <button className="buton">Update Book</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBook;
