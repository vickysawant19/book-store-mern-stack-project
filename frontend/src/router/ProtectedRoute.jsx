import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();
  if (authLoading)
    return (
      <div className="w-full flex items-center justify-center font-semibold text-xl">
        Loading...
      </div>
    );
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
