import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import "../styles/Book.css";

const Genre = ({isNightMode}) => {
  const [genreData, setGenreData] = useState({
    name: "",
    books: [],
  });
  const [loading, setLoading] = useState();

  const { id } = useParams();
  useEffect(() => {
    loadGenre();
  }, []);

  const loadGenre = async () => {
    setLoading(true);
    const res = await axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/genres/${id}`);
    setGenreData(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <ThreeDotsLoading />
      ) : (
        <div className={`container py-4 ${isNightMode ? "night-mode" : ""}`}>
          <Link
            className="btn btn-default"
            to="/genres"
            style={{
              flexGrow: "1",
              backgroundColor: "white",
              color: "#007bff",
              border: "2px solid #007bff",
            }}
          >
            Back to Genres
          </Link>
          <div className="genre-card card shadow my-4">
            <div className="card-body" style={{backgroundColor: isNightMode ? "black" : "#f6eeee",
        color: isNightMode ? "white" : "inherit",}}>
              <h1 className="card-title">Genre: {genreData.name}</h1>
              <Link to={`/genres/edit/${id}`} className="btn btn-primary">
                Edit Genre
              </Link>
            </div>
          </div>
          <h4 className="display-3">Books Related</h4>
          <div className="row">
            {genreData.books.map((book, index) => (
              <div key={index} className="col-md-4">
                <div className="book-card card shadow my-4">
                  <div className="card-body" style={{backgroundColor: isNightMode ? "black" : "#f6eeee",
        color: isNightMode ? "white" : "inherit",}}>
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">Author: {book.author.name}</p>
                    <p className="card-text">Price: {book.price}</p>
                    <p className="card-text">Rating: {book.review.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Genre;
