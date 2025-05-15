import React, { useState } from 'react';
import useFetchUser from '../hooks/useFetchUser';
import '../../home/Home.css';
import { limitValues } from '../services/constants';



const UserTable = () => {
  const [limit, setLimit] = useState(50);
  const { loading, users, totalUserCnt, error } = useFetchUser({ limit: limit, offset: 0 });

  const handleLimitChange = (e) => {
    const selectedLimit = parseInt(e.target.value);
    setLimit(selectedLimit);
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
            </div>
          </div>
      }
    </div>
  )
}
export default UserTable;

