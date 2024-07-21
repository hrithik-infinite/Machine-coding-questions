const Pagination = ({ totalPages, page, setPage, maxVisiblePages = 5 }) => {
  const selectPageHandler = (e) => {
    if (e >= 1 && e <= totalPages) setPage(e);
  };
  const renderPageNumbers = () => {
    const pageNumber = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumber.push(renderPageKey(i, i));
      }
    } else {
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (startPage > 1) {
        if (startPage > 2) {
          pageNumber.push(renderPageKey(1, 1));
        }
        pageNumber.push(renderPageKey("...", "ellipsis__start"));
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumber.push(renderPageKey(i, i));
      }
      if (endPage < totalPages) {
        pageNumber.push(renderPageKey("...", "ellipsis__end"));
        if (endPage < totalPages - 1) {
          pageNumber.push(renderPageKey(totalPages));
        }
      }
    }
    return pageNumber;
  };

  const renderPageKey = (currPage, key) => {
    return (
      <span className={page === currPage ? "pagination__selected" : ""} onClick={() => selectPageHandler(currPage)} key={key}>
        {currPage}
      </span>
    );
  };
  return (
    <div className="pagination">
      <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disabled"}>
        &lt;
      </span>
      {renderPageNumbers()}
      <span onClick={() => selectPageHandler(page + 1)} className={page < totalPages ? "" : "pagination__disabled"}>
        &gt;
      </span>
    </div>
  );
};

export default Pagination;
