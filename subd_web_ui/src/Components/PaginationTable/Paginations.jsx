/* eslint-disable react/prop-types */
const Pagination = ({
  currentPage,
  entriesPerPage,
  totalEntries,
  paginate,
}) => {
  const pageNumbers = [];

  const startNumber =
    currentPage === 1
      ? 1
      : currentPage === Math.ceil(totalEntries / entriesPerPage)
      ? Math.ceil(totalEntries / entriesPerPage) === 2
        ? currentPage - 1
        : currentPage - 2
      : currentPage - 1;

  const endNumber =
    Math.ceil(totalEntries / entriesPerPage) <= 1
      ? 1
      : Math.ceil(totalEntries / entriesPerPage) === 2
      ? startNumber + 1
      : startNumber + 2;

  for (let i = startNumber; i <= endNumber; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(totalEntries / entriesPerPage))
      paginate(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) paginate(currentPage - 1);
  };

  //   useEffect(() => {
  //     console.log(currentPage);
  //   }, [currentPage]);

  return (
    <>
      <div className="page">
        {currentPage + " out of " + Math.ceil(totalEntries / entriesPerPage)}
      </div>
      <div className="paginationButtons">
        <button className="paginationBtnW" onClick={prevPage}>
          Prev page
        </button>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <button
                className={
                  number === currentPage ? "paginationBtnAct" : "paginationBtn"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button className="paginationBtnW" onClick={nextPage}>
          Next page
        </button>
        {/* <input
          className="countPage"
          placeholder="Input number of page for show and press Enter"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            if (event.key === "Enter") {
              if (
                event.target.value === "0" ||
                event.target.value === "1" ||
                event.target.value >= Math.ceil(totalEntries / entriesPerPage)
              ) {
                event.target.value = "";
              } else {
                paginate(event.target.value);
              }
              event.target.value = "";
              return;
            }
          }}
        /> */}
      </div>
    </>
  );
};
export default Pagination;
