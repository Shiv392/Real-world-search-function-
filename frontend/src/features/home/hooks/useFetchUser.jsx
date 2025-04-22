import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/UserAPI';

const useFetchUser=({limit,offset})=>{
  const [loading,setLoading]=useState(false);
  const [users,setUsers]=useState([]);
  const [error,setError]=useState(null);

  useEffect(()=>{
    console.log('shivsoni')
  fetchUser();
  },[limit,offset]);

  const fetchUser=async()=>{
    setLoading(true);
    try{
        console.log('raipur')
        const data = await getUsers({limit,offset});
        console.log('data-------->',data)
        setUsers(data);
        setError(null);
    }
    catch(err){
        setError(err);
        setUsers([]);
    }
    finally{
        setLoading(false);
    }
  }

  return {loading,users,error};
}

export default useFetchUser;