import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../../../common/apiUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      if (formData.username || formData.password) {
        const res = await axios.post(`${apiUrl}/auth/login`, formData);
        const data = res.data;
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Dang nhap thanh cong");
          navigate("/");
        } else {
          alert("Dang nhap that bai");
        }
      } else {
        alert("Vui long dien day du thong tin");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onSubmit = () => {
    fetchData();
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="customer">
      <form className="form">
        <h1 className="form-title">Login</h1>
        <p>If you have an account with us, please sign in.</p>

        <div className="input_field">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={(e) => changeInput(e)}
          />
        </div>

        <div className="input_field">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => changeInput(e)}
          />
        </div>

        <button
          className="form-btn"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
