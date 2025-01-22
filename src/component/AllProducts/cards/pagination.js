export const PaginationComponent = ({ data, itemsPerPage, onPageChange }) => {
  const pageCount = Math.ceil(data.length / itemsPerPage);

 
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

 
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };


  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageClick(number - 1)}
          className="page-item"
        >
          {number}
        </button>
      ))}
    </div>
  );
};
