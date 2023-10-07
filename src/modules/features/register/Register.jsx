import React, { useState } from "react";
import Loading from "../../../components/Loading";
import "../../../styles/modules/Register.scss";
import axios from "axios";
import { apiUrl } from "../../../common/apiUrl";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    mail: "",
    role: "user",
  });

  const changeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (emailRegex.test(formData.mail)) {
        const res = await axios.post(`${apiUrl}/user/create`, formData);
        const data = res.data;
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Tao tai khoan thanh cong");
        }
        navigate("/");
      } else {
        alert("Nhap dung dinh dang gmail");
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    fetchData();
    setFormData({
      fullname: "",
      username: "",
      password: "",
      mail: "",
      role: "user",
    });
  };

  return (
    <div className="customer">
      <form className="form">
        <h1 className="form-title">Register</h1>
        <p>If you have an account with us, please sign in.</p>
        <div className="input_field">
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="fullname"
            required
            value={formData.fullname}
            onChange={(e) => changeInput(e)}
          />
        </div>

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

        <div className="input_field">
          <input
            type="text"
            name="mail"
            id="mail"
            placeholder="Email"
            required
            value={formData.mail}
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
          {isLoading ? <Loading /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
