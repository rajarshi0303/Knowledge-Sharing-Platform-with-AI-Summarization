import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Signup() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //console.log(formData);
    try {
      const res = await axios.post("/api/auth/signup", formData);
      // Saving user info from response
      setUser(res.data.user);
      navigate("/articles");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-200 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Role
            </label>

            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-full text-sm px-3 py-1.5 mt-1 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <SelectItem value="user" className="dark:text-white">
                  User
                </SelectItem>
                <SelectItem value="admin" className="dark:text-white">
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
