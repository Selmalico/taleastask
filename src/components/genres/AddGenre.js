import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import BookSelect from "./BookSelect";

const AddGenre = () => {
  let history = useHistory();
  const [genre, setGenre] = useState({
    name: "",
    bookIds: [],
  });
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({
    name: "",
    bookIds: "",
  });

  const { name, bookIds } = genre;

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!name.trim()) {
      formIsValid = false;
      newErrors.name = "Name is required";
    } else {
      newErrors.name = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setGenre({ ...genre, [name]: value });
  };

  const onBookSelect = (e) => {
    const selectedBooks = e.target.value;
    setGenre({ ...genre, bookIds: selectedBooks });
  };
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const selectedBookIds = books
        .filter((book) => genre.bookIds.includes(book.title))
        .map((book) => book._id);
        const genreData = {
          name: genre.name,
          bookIds: selectedBookIds,
        };
  
        await axiosInstance.post("/genres", genreData);
        setSuccessMessage("Genre added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push("/genres");
        }, 2000);
      } catch (error) {
        console.error(error);
        setSuccessMessage("Error adding genre. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-primary" to="/genres" style={{
              flexGrow: "1",
              backgroundColor: "white",
              color: "#007bff",
              border: "2px solid #007bff",
            }}>
          Back to genres
        </Link>
        <h2 className="text-center mb-4">Add A Genre</h2>
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
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={onInputChange}
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
              <BookSelect
                className="form-control form-control-lg"
                books={books}
                selectedBooks={bookIds || []} // Ensure selectedBooks is an array
                setSelectedBooks={onBookSelect}
              />
            </div>
            <button type="submit" className="buton">
              Add Genre
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddGenre;
