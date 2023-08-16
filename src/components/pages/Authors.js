// Author.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Book.css"; // Import the common CSS styles
import Pagination from "../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmBox from "../../Confirmation";
import ConvertToImage from "../converter/ConvertToImage";
import MyLoader from "../loading/MyLoader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Search from "../Search";

const Authors = ({isNightMode}) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadAuthors();
  }, [currentPage]);

  const loadAuthors = async () => {
    setLoading(true)
    console.log(currentPage)
    const results = await axios.get(`http://localhost:8000/authorsmodel?page=${currentPage}&limit=6&search=${searchValue}`);
    setAuthors(results.data.authorsData);
    setTotalPages(results.data.Pagination.pageCount);
    setTimeout(() => {
      setLoading(false); 
    }, 1000);;
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/authors/${id}`);
      loadAuthors();
      setOpen(false);
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

  return (
    <div className="container">
      <div className="py-4">
      <div className="row align-items-center">
          <div className="col-6">
            <h1>
              <tab>Authors Page</tab>
            </h1>
          </div>
          <div
            className="col-6 d-flex justify-content-end"
            style={{ marginLeft: "-200px", marginTop: "11px" }}
          >
            <div className="filter-container">
              <label className="filter.label" />
              <Search searchValue={searchValue} setSearchValue={setSearchValue} isNightMode={isNightMode} />
              <Button
                onClick={loadAuthors}
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
            <button className="bt">
              <Link to="/author/add" className="bt">
                Add Author
              </Link>
            </button>
          </div>
        </div>
        <hr></hr>
        {loading ? (
          // If loading is true, display the loader component
          <div className="data-container">
            <MyLoader />
          </div>
        ) : (
        <div className="data-container">
          {authors.map((author, index) => (
            <div key={author._id} className="data-card">
              <ConvertToImage img={author.img} />
              <h2>{author.name}</h2>
              <p>Email: {author.email}</p>
              <p>Nationality: {author.nationality}</p>
              <div className="data-actions">
                <Link className="btn btn-primary mr-2" to={`/authors/${author._id}`}>
                  View
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => openDelete(author)}
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
      <Pagination onPageChange={handlePageChange} totalPages={totalPages}  />
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteData?.name}
        deleteFunction={() => deleteAuthor(deleteData?._id)}
      />
    </div>
  );
};

export default Authors;
