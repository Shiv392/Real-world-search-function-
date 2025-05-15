import React, { useState } from 'react';
import useFetchUser from '../hooks/useFetchUser';
import '../../home/Home.css';
import { limitValues } from '../services/constants';



const UserTable = () => {
  const [limit, setLimit] = useState(50);
  const [offset, setoffset] = useState(0);
  const { loading, users, totalUserCnt, pagelist, error } = useFetchUser({ limit: limit, offset: offset });
  const [page, setPage] = useState(1)

  const handleLimitChange = (e) => {
    setPage(1);
    setoffset(0);
    const selectedLimit = parseInt(e.target.value);
    setLimit(selectedLimit);
  };

  const handlePageChange = (page) => {
    setPage(page);
    setoffset((page - 1) * limit);
  }

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

  if (loading) return <h3 style={{ 'textAlign': 'center' }}>Loading....</h3>

  return (
    <div>
      <h1>User Table Data</h1>
      {
        users.length == 0 ? <h3>No Data</h3> :
          <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center', marginTop: '30px' }}>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>

              <label htmlFor="limitSelect">Records per page: </label>
              <select id="limitSelect" value={limit} onChange={handleLimitChange}>
                {limitValues.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            
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
                        <td className="table-cell">{index + 1}</td>
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
              {getVisiblePages(page, pagelist.length).map((pg, index) => (
                <span key={index}>
                  {pg === '...' ? (
                    <span style={{ margin: '5px' }}>...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(pg)}
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

