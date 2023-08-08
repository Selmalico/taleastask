import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const Pagination = ({ onPageChange, totalPages }) => {
  const [currentPageInternal, setCurrentPageInternal] = useState(1);

  useEffect(() => {
    onPageChange(currentPageInternal);
  }, [currentPageInternal, onPageChange]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected+1;
    setCurrentPageInternal(selectedPage);
    window.scrollTo(0, 0);
  };
  return(
    <div>
      <ReactPaginate previousLabel = {"< previous"} 
      nextLabel = {"next >"}
      breakLabel = {"..."}
      pageCount={totalPages} 
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      renderOnZeroPageCount={null}
      forcePage={currentPageInternal-1}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName = "page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLinkClassName="page-link"
      activeClassName="active"
      

      />
    </div>
  )
}

export default Pagination