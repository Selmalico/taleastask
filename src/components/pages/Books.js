import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Book.css";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmBox from "../../Confirmation";
import MyLoader from "../loading/MyLoader";
import ConvertToImage from "../converter/ConvertToImage";
import Button from "react-bootstrap/Button";
import "bootstrap";
import Search from "../Search";

const Books = ({isNightMode}) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authors, setAuthors] = useState([]);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    loadBooks();
    loadAuthors();
  }, [currentPage]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const results = await axios.get(
        `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/bookspag?page=${currentPage}&limit=6&search=${searchValue}&authorId=${selectedAuthor}&sort=${sortValue}`
      );
  
      setBooks(results.data.booksData);
      setTotalPages(results.data.Pagination.pageCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadAuthors = async () => {
    try {
      const response = await axios.get("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/authors");
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/books/${id}`);
      setOpen(false);
      loadBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const openDelete = (data) => {
    setOpen(true);
    setDeleteData(data);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const applyFiltersAndSort = () => {
    setCurrentPage(1); 
    loadBooks(); 
  };

  const clearFilters = async() => {
    setLoading(true);
    try {
      setSearchValue("");
      setSelectedAuthor("");
      setSortValue("")
      const results = await axios.get(
        `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/bookspag?page=${currentPage}&limit=3&search=&authorId=&sort=`
      );
  
      setBooks(results.data.booksData);
      setTotalPages(results.data.Pagination.pageCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>
              <tab>Book Page</tab>
            </h1>
          </div>
          <div class="col-6 d-flex " style={{marginRight: "auto", width: "auto",}}>
            <div className="filter-container">
              <label className="filter.label" />
              <Search searchValue={searchValue} setSearchValue={setSearchValue} isNightMode={isNightMode} />
              <Button
                onClick={loadBooks}
                variant="outline-success"
                style={{
                  position: "inherit",
                  borderRadius: "0",
                  backgroundColor: "black",
                  color: "white",
                  marginLeft: "-9px",
                }}
              >
                <FontAwesomeIcon icon={faSearch} color="#fff" />
              </Button>
            </div>
            <button className="bt style" style={{marginTop: "15px"}}>
              <Link to="/book/add" className="bt">
                Add Book
              </Link>
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="row">
            <h5>Filter books</h5>
            <div className="col">
              <label className="filter-label">Select Author</label>
              <select
                className="filter-dropdown"
                name="author"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                style={{backgroundColor: isNightMode ? "#1e1d23" : "#fff", color: isNightMode ? "white":"black"}}
              >
                <option value="">Choose Author</option>
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.name}
                  </option>
                ))}
              </select>
              </div>
              <div className="col">
              <label className="filter-label">Sort by Price</label>
              <select
                className="select"
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                style={{backgroundColor: isNightMode ? "#1e1d23" : "#fff", color: isNightMode ? "white":"black"}}
              >
                <option value="">Select Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
              </div>
              <div className="col" style={{marginTop:"auto"}}>
              <button
                onClick={applyFiltersAndSort}
                style={{
                  position: "inherit",
                  borderRadius: "10px solid",
                  marginLeft: "20px",
                  backgroundColor: "black",
                }}
              >
                Apply Filters & Sort
              </button>
              <Link
                onClick={clearFilters}
                style={{
                  position: "inherit",
                  marginLeft: "20px",
                  // backgroundColor: "white",
                  // color: "black",
                  backgroundColor: isNightMode ? "black" : "#fff",
                  color: isNightMode ? "white" : "black",
                  textDecoration: "none",
                }}
              >
                Clear all filters
              </Link>
            </div>
          </div>
        <br />
        <hr /><br />
        {loading ? (
          <div className="data-container">
            <MyLoader />
          </div>
        ) : (
          <div className="data-container">
            {books.map((book) => (
              <div key={book._id} className="data-card">
                <img src={book.img} alt="book cover" className="book-image"/>
                <h2>{book.title}</h2>
                <p>Author: {book.author.name}</p>
                <p>
                  Genre:{" "}
                  {book.genres.map((genre) => genre.name).join(", ") ||
                    "Not Available"}
                </p>
                <p>Price: {book.price}</p>
                <div className="data-actions">
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/books/${book._id}`}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => openDelete(book)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteData?.title}
        deleteFunction={() => deleteBook(deleteData?._id)}
      />
    </div>
  );
};

export default Books;
