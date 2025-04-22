import React from 'react';
import useFetchUser from '../hooks/useFetchUser';

const UserTable=()=>{

    const {loading,users,error} = useFetchUser({limit:50,offset:10});
    console.log('api data------->',users);

return(
    <h1>User Table Component</h1>
)
}
export default UserTable;