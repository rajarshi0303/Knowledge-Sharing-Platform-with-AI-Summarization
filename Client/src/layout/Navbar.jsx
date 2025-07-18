import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import ModeToggle from "@/theme/ModeToggle";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-6 bg-white shadow dark:bg-gray-800 dark:shadow-md transition-colors duration-300">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        🧠 KnowShare
      </Link>

      <div className="flex items-center md:gap-4">
        <ModeToggle />

        {user ? (
          <div className="flex items-center md:gap-4">
            <Link
              to="/articles/new"
              className="font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center md:border-2 border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8 md:me-2 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                ></path>
              </svg>
              <span className="text-gray-700 dark:text-gray-200 hidden md:block">
                Hi, {user.name}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
