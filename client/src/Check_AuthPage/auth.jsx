

import React from "react";



import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ children,isAuthenticated,user }) {
  const location = useLocation();
  





  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/signIn" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/signIn") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/signIn" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/signIn") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/shop" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
