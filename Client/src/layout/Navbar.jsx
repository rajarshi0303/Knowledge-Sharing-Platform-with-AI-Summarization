import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import ModeToggle from "@/theme/ModeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `block px-2 py-2 text-sm font-medium rounded transition ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            🧠 KnowShare
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/articles" end className={navLinkClass}>
              Articles
            </NavLink>
            {user && (
              <NavLink to="/articles/new" className={navLinkClass}>
                My Articles
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
            <ModeToggle />
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm px-4 py-2 border border-blue-500 rounded-md transition ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                        : "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-sm text-white px-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-blue-700 dark:bg-blue-600"
                        : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <button onClick={toggleMenu} className="ml-2 p-2">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gray-700/45 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-16 h-full w-10/12 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-2">
            <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/articles"
              end
              className={navLinkClass}
              onClick={closeMenu}
            >
              Articles
            </NavLink>
            {user && (
              <NavLink
                to="/articles/new"
                className={navLinkClass}
                onClick={closeMenu}
              >
                My Articles
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                Admin
              </NavLink>
            )}
            <hr className="border-gray-300 dark:border-gray-700" />
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm px-4 py-2 border border-blue-500 rounded-md transition ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                        : "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-sm text-white px-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-blue-700 dark:bg-blue-600"
                        : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
