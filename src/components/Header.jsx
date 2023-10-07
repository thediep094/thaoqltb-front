import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/Header.scss";
const Header = () => {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location, navigator]);

  const logOut = () => {
    localStorage.removeItem("user");
    navigator("/login");
    setUser(null);
  };

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigator("/");
    }
  }, [user, location, navigator]);

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="header-link">
          Homepage
        </Link>
        {user?.role === "admin" && (
          <Link to="/addbook" className="header-link">
            Add book
          </Link>
        )}
      </div>
      <div className="header-right">
        {!user && (
          <>
            <Link to="/login" className="header-link">
              Login
            </Link>
            <Link to="/register" className="header-link">
              Register
            </Link>
          </>
        )}
        {user && (
          <button className="header-btn" onClick={() => logOut()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
