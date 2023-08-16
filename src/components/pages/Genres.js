import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Book.css"
import Pagination from "../Pagination";
import ConfirmBox from "../../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import MyLoader from "../loading/MyLoader";
import  Button  from "react-bootstrap/Button";
import Search from "../Search";

const Genres = ({isNightMode}) => {
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadGenres();
  }, [currentPage]);

  const loadGenres = async () => {
    setLoading(true)
    const results = await axios.get(`http://localhost:8000/genresmodel?page=${currentPage}&limit=6&search=${searchValue}`);
    setGenres(results.data.genresData);

    setTotalPages(results.data.Pagination.pageCount);

    setTimeout(() => {
      setLoading(false); 
    }, 1000)
  };

  const deleteGenre = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/genres/${id}`);
      loadGenres();
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
    <div className="container" >
      <div className="py-4">
      <div className="row align-items-center">
          <div className="col-6">
            <h1>
              <tab>Genres Page</tab>
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
                onClick={loadGenres}
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
              <Link to="/genre/add" className="bt">
                Add Genre
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
          {genres.map((genre) => (
            <div key={genre._id} className="data-card">
              <h2>{genre.name}</h2>
              <br></br>
              <div className="data-actions">
                <Link className="btn btn-primary mr-2" to={`/genres/${genre._id}`}>
                  View
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => openDelete(genre)}
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
        title={deleteData?.name}
        deleteFunction={() => deleteGenre(deleteData?._id)}
      />
    </div>
  );
};

export default Genres;
