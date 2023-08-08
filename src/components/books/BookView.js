import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import ConvertToImage from "../converter/ConvertToImage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const BookView = ({isNightMode}) => {
  const [book, setBook] = useState({
    title: "",
    author: { name: "" },
    price: "",
    genres: [],
    review: { rating: "", votes: "" },
    img: "",
  });
  const [loading, setLoading] = useState();
  const { id } = useParams();
  useEffect(() => {
    loadBookView();
  }, []);

  const loadBookView = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:8000/books/${id}`);
    setBook(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!book) {
    return <Redirect to="/" />;
  }

  return (
    <div className={`container py-4 ${isNightMode ? "night-mode" : ""}`}>
      {/* Back Button */}
      <Link
        className="btn btn-primary"
        to="/"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          flexGrow: "1",
          backgroundColor: "white",
          color: "#007bff",
          border: "2px solid #007bff",
        }}
      >
        Back to Books
      </Link>
      {loading ? (
        <ThreeDotsLoading />
      ) : (
        <div
          className="book-card"
          style={{
            display: "flex",
            backgroundColor: isNightMode ? "black" : "#f6eeee",
            color: isNightMode ? "white" : "inherit",
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",
            width: "70%",
            margin: "0 auto",
            marginTop: "100px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
          }}
        >
          <div className="book-details" style={{ flex: 1, marginRight: "1rem" }}>
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">Author: {book.author.name}</p>
            <p className="book-price">Price: ${book.price}</p>
            <p className="book-genres">
              Genres: {book.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p
              className="book-rating"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "5px",
                color:
                  book.review.rating >= 8
                    ? "#28a745"
                    : book.review.rating >= 6
                    ? "#ffc107"
                    : "#dc3545",
              }}
            >
              Rating: {book.review.rating}
            </p>
            <p className="votes">Votes: {book.review.votes}</p>
            <Link className="btn btn-primary mr-2" to={`/books/edit/${book._id}`}>
              Edit Book
            </Link>
          </div>
          <div>
            <ConvertToImage img={book.img} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookView;
