import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, fetchUser, loading } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
