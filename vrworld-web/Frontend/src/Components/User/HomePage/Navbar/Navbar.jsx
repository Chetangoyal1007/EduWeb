import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/logo.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Test", link: "/test", requiresAuth: true }, // Requires authentication
  { id: 3, name: "Course", link: "/course", requiresAuth: true }, // Requires authentication
  { id: 4, name: "Contact", link: "/contact" },
  { id: 5, name: "Login", link: "/login", requiresAuth: false }, // Login link
];

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by checking for the token in localStorage
  const isAuthenticated = localStorage.getItem("token") !== null;

  const toggleMenu = () => setShowMenu(!showMenu);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user session data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="relative z-[9999] text-black dark:text-white duration-300 bg-white dark:bg-black shadow-md">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="EduWeb Logo" className="h-16" />
            <p className="text-3xl">
              Edu<span className="font-bold">Web</span>
            </p>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link, requiresAuth }) => {
                // Conditionally render links based on authentication status
                if (requiresAuth && !isAuthenticated) return null; // Don't show links if the user is not authenticated
                if (!requiresAuth && isAuthenticated && name === "Login") return null; // Don't show Login button if user is authenticated

                return (
                  <li key={id} className="py-4">
                    <Link
                      to={link}
                      className="text-xl font-semibold hover:text-primary py-2 hover:border-b-2 hover:border-secondary transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <DarkMode />
            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <DarkMode />
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer" size={30} />
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMenu && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-md md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              {NavLinks.map(({ id, name, link, requiresAuth }) => {
                // Conditionally render links based on authentication status
                if (requiresAuth && !isAuthenticated) return null; // Don't show links if the user is not authenticated
                if (!requiresAuth && isAuthenticated && name === "Login") return null; // Don't show Login button if user is authenticated

                return (
                  <li key={id}>
                    <Link
                      to={link}
                      className="text-xl font-semibold hover:text-primary transition-colors duration-500"
                      onClick={toggleMenu} // Close menu on click
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
              {/* Mobile Logout Button */}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
