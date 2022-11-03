import { Navigate, Outlet } from "react-router-dom";
import React from "react";
//import ResponsiveAppBar from './Header';

export default function ProtectedRoutes() {

    const auth = localStorage.getItem('token')
    if (auth == null) {
        return <Navigate to='/login' />
    }
    else {
        return    <Outlet /> 
      //  return  <>  <ResponsiveAppBar />  <Outlet /> </>
    }

    //  auth.token ? <Outlet /> : <Navigate to ='/login' />

}; 
