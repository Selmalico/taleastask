import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";
import ConvertToImage from "../converter/ConvertToImage";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min"

const Author = ({isNightMode}) => {
  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    nationality: "",
    books: [],
    img: "",
  });

  const [loading, setLoading] = useState();
  const { id } = useParams();
  useEffect(() => {
    loadAuthor();
  }, []);

  const loadAuthor = async () => {
    setLoading(true);
    const res = await axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors/${id}`);
    setAuthorData(res.data);
    setTimeout(()=>{
      setLoading(false)
    },2000)
  };

  if(!authorData){
    return <Redirect to="/authors" />
   }

  return (
    <>
    {loading ? ( 
          <ThreeDotsLoading />
        ) : (
    <div className={`container py-4 ${isNightMode ? "night-mode" : ""}`}>
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
        Back to Authors
      </Link>
      
      <div
        className="card shadow my-4"
        style={{  backgroundColor: isNightMode ? "black" : "#f6eeee",
        color: isNightMode ? "white" : "inherit", borderRadius: "5px" }}
      >
        <div className="card-body" style={{textAlign:"center"}}>
          <h1 className="card-title" style={{ color:isNightMode ?"white" : "#333"}}>
            Author: {authorData.name}
          </h1>
          <hr style={{ borderTop: "1px dashed #ccc", margin: "20px 0" }} />
          <div className="row">
            <div >
            <div>
            <img src={authorData.img} alt="author" className="book-image"/>
              </div>
              <p className="card-text" style={{ color:isNightMode ?"white" : "#777"}}>
                Email: {authorData.email}
              </p>
              <p className="card-text" style={{ color:isNightMode ?"white" : "#777" }}>
                Nationality: {authorData.nationality}
              </p>
              <Link
                to={`/authors/edit/${id}`}
                className="btn btn-warning"
                style={{ backgroundColor: "#007bff", color: "#fff" }}
              >
                Edit Author
              </Link>
              
            </div>
          </div>
        </div>
      </div>
      <h4
        className="display-3"
        style={{ textAlign: "center", marginBottom: "20px", color:isNightMode ?"white" : "#333" }}
      >
        Books Related
      </h4>
      <div className="row">
        {authorData.books.map((book, index) => (
          <div key={index} className="col-md-4">
            <Link to={`/books/${book._id}`}
              className="card shadow my-4"
              style={{
                textDecoration: "none",
                backgroundColor: isNightMode ? "black" : "#f6eeee",
                color: isNightMode ? "white" : "inherit",
                borderRadius: "5px",
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <div className="card-body" style={{textAlign: "center"}} >
              <img src={book.img} alt="book cover" className="book-image"/>
                <h5 className="card-title" style={{ color:isNightMode ?"white" : "#333" }}>
                  {book.title}
                </h5>
                <p className="card-text" style={{color:isNightMode ?"white" : "#333"}}>
                  Price: {book.price}
                </p>
                <p
                  className="card-text"
                  style={{ color:isNightMode ?"white" : "#333", fontSize: "18px", fontWeight: "bold" }}
                >
                  Rating: {book.review.rating}
                </p>
                <p className="card-text" style={{ color:isNightMode ?"white" : "#333" }}>
                  Votes: {book.review.votes}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )}
    </>
  );
};

export default Author;
