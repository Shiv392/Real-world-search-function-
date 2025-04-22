import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home=lazy(()=>import('../features/home/Home'));

const AppRoutes=()=>{
return(
    <Routes>
        <Route path='/' element={<Home />}></Route>
    </Routes>
)
}
export default AppRoutes;