import React, { useMemo, useState } from 'react';
import useFetchUser from '../hooks/useFetchUser';
import '../../home/Home.css';
import { limitValues } from '../services/constants';



const UserTable = () => {
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const { loading, users, totalUserCnt, pagelist, error } = useFetchUser({ limit: limit, offset: offset, keyword: searchInput });
  const [page, setPage] = useState(1)

  const handleLimitChange = (e) => {
    setPage(1);
    setOffset(0);
    const selectedLimit = parseInt(e.target.value);
    setLimit(selectedLimit);
  };

  const handlePageChange = (page) => {
    setPage(page);
    setOffset((page - 1) * limit);
  }

  //here getVisiblePages will render and recalculate on every changes 
  //that's why use usememo to recalculate only when page or pagelist changes--->
  const getVisiblePages = (currentPage, totalPages) => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Add left ellipsis if needed
    if (currentPage > 4) {
      pages.push('...');
    }

    // Add pages around current page
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handleInputChange = (e) => {
    setOffset(0);
    setPage(1);
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  //store memoized function value in the array
  const visiblePages = useMemo(() => getVisiblePages(page, pagelist.length), [page, pagelist])

  return (
    <div>
      <h1>User Table Data</h1>
      <div style={{ marginBottom: '10px', textAlign: 'center',display:'flex','justifyContent':'center','alignItems':'center',gap:'30px' }}>

       <div>
         <label htmlFor="limitSelect">Records per page: </label>
        <select id="limitSelect" value={limit} onChange={handleLimitChange}>
          {limitValues.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
       </div>

        <div>
          <input type="text" placeholder='Search By Name/City/Email' value={searchInput} onChange={(e) => handleInputChange(e)} />
        </div>
      </div>
      {
        loading ? <h3>Loding.....</h3> : 
        users.length == 0 ? <h3>No Data</h3> :
          <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center', marginTop: '2px' }}>

            <div style={{ height: '600px', overflow: 'scroll', 'width': '80%' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th className="header-cell">S.No</th>
                    <th className="header-cell">Id</th>
                    <th className="header-cell">Name</th>
                    <th className="header-cell">Email</th>
                    <th className="header-cell">City</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                        <td className="table-cell">{offset + index + 1}</td>
                        <td className="table-cell">{user.id}</td>
                        <td className="table-cell">{user.name}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.city}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            <div>
              Total User : {totalUserCnt}
              {visiblePages.map((pg, index) => (
                <span key={index}>
                  {pg === '...' ? (
                    <span style={{ margin: '5px' }}>...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(pg)}
                      aria-label={`Go to page ${pg}`}
                      style={{
                        margin: '5px',
                        padding: '6px 12px',
                        backgroundColor: pg === page ? 'skyblue' : 'white',
                        border: '1px solid #ccc',
                        cursor: 'pointer'
                      }}
                    >
                      {pg}
                    </button>
                  )}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>

            </div>
          </div>
      }
    </div>
  )
}
export default UserTable;

