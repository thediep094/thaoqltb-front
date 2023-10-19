import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/Header.scss";
import { Badge } from "@mui/material";
import {
  ArrowDropDownOutlined,
  PersonOutline,
  SearchOutlined,
  ShoppingCartOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";

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
    <div className="ThanhMenu">
      <div className="ThanhMenu__trai">
        <Link to="/" className="ThanhMenu__trai__link">
          <div className="ThanhMenu__trai--logo">
            <img src={"/Logo.png"} alt="" />
            <div className="ThanhMenu__trai--ten">
              <h1>Bookoe</h1>
              <p>NHÓM THẢO</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="ThanhMenu__phai">
        {user?.role === "admin" && (
          <Link to="/addbook" className="ThanhMenu__phai--dangky--icon">
            <div className="ThanhMenu__phai--dangnhap">
              <div className="ThanhMenu__phai--dangnhap__link">Add book</div>
            </div>
          </Link>
        )}
        {user ? (
          <>
            <Link to="/giohang">
              <div className="ThanhMenu__phai--giohang">
                <Badge color="primary" max={0}>
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            </Link>
            <div className="ThanhMenu__phai--dangky--icon">
              <div className="ThanhMenu__phai--dangnhap">
                <div className="ThanhMenu__phai--dangnhap__link">
                  {user.username}
                </div>
              </div>
            </div>

            <div
              className="ThanhMenu__phai--dangky--icon"
              onClick={() => logOut()}
            >
              <div className="ThanhMenu__phai--dangky">
                <div className="ThanhMenu__phai--dangky__link">Đăng xuất</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/dangnhap" className="ThanhMenu__phai--dangky--icon">
              <div className="ThanhMenu__phai--dangnhap">
                <Link
                  to="/dangnhap"
                  className="ThanhMenu__phai--dangnhap__link"
                >
                  Đăng nhập
                </Link>
              </div>
            </Link>
            <Link to="/dangky" className="ThanhMenu__phai--dangky--icon">
              <div className="ThanhMenu__phai--dangky">
                <PersonOutline className="ThanhMenu__phai--dangky--icon" />
                <Link to="/dangky" className="ThanhMenu__phai--dangky__link">
                  Đăng ký
                </Link>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
