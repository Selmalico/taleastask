import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import BookSelect from "./BookSelect";

const EditGenre = () => {
  let history = useHistory();
  const { id } = useParams();
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
  const onInputChange = (e) => {
    setGenre({ ...genre, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadGenre();
    loadBooks();
  }, []);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {...errors};

    if (!name.trim()) {
      formIsValid = false;
      newErrors.name = "Name is required"
    } else {
      newErrors.name = "";
    }

    setErrors(newErrors); 
  return formIsValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      try{
    await axios.put(`http://localhost:8000/genres/${id}`, genre);
    setSuccessMessage("Genre updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        history.push(`/genres/${id}`);
      }, 2000);
      } catch (error) {
        console.log(error)
        setSuccessMessage("Error adding genre. Please try again.");
      }
  }};

  const loadBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books");
      setBooks(response.data);
    } catch (error){
      console.log(error);
    }
  }

  const onBookSelect = (e) => {
    const selectedBooks = e.target.value;
    setGenre({ ...genre, bookIds: selectedBooks });
  };
  

  const loadGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/genres/${id}`);
      const { name, bookIds } = response.data;
      const bookIdsString = bookIds.join(", ");
      setGenre({ name, bookIds: bookIdsString });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
      <Link className="btn btn-primary" to={`/genres/${id}`} style={{
              flexGrow: "1",
              backgroundColor: "white",
              color: "#007bff",
              border: "2px solid #007bff",
            }} >
        Back to genre
      </Link>
        <h2 className="text-center mb-4">Update: {genre.name}</h2>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {loading ? <ThreeDotsLoading /> : (
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
            {errors.name && <div className="error-message">
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000",}} />
            {errors.name}
            </div>}
          </div>
          <div className="form-group">
          <BookSelect
                className="form-control form-control-lg"
                books={books}
                selectedBooks={bookIds || []} // Ensure selectedBooks is an array
                setSelectedBooks={onBookSelect}
          />
          </div>
          <div className="text-center">
          <button className="buton">Update Genre</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default EditGenre;
