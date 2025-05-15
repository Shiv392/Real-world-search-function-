import React, { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../services/UserAPI';

const useFetchUser=({limit,offset})=>{
  const [loading,setLoading]=useState(false);
  const [users,setUsers]=useState([]);
  const [error,setError]=useState(null);
  const [totalUserCnt,setUserCnt]=useState(0);
  const [pagelist,setPageList] = useState([]);

  const fetchUser=useCallback(async()=>{
    setLoading(true);
    try{
        const data = await getUsers({limit,offset});
        console.log('data-------->',data)
        setUsers(data.user);
        setError(null);
        setUserCnt(data.totalUser);
        setPageList([...data.pagelist]);
    }
    catch(err){
        setError(err);
        setUsers([]);
        setUserCnt(0);
    }
    finally{
        setLoading(false);
    }
},[limit,offset])

  useEffect(()=>{
    console.log('shivsoni')
  fetchUser();
  },[fetchUser]);

  return {loading,users,totalUserCnt,pagelist,error};

}
export default useFetchUser;