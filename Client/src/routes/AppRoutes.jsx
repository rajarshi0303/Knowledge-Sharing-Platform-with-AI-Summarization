import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Articles from "../pages/ArticlesPage";
import ArticleDetail from "../pages/ArticleDetail";
import ManageArticles from "../pages/ManageArticles";

import ProtectedRoute from "@/components/ProtectedRoute";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

import AdminPage from "@/pages/AdminPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />

      <Route
        path="/articles/new"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <ManageArticles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
