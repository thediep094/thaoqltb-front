import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../../../common/apiUrl";
import "../../../styles/components/modules/BookAdd.scss";
import Loading from "../../../components/Loading";
const BookAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    let fileArray = [];
    for (let i = 0; i < files.length; i++) {
      fileArray.push(files.item(i));
    }
    setFormData({ ...formData, images: fileArray });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formSubmit = new FormData();
      formSubmit.append("name", formData.name);
      formSubmit.append("price", formData.price);
      formSubmit.append("description", formData.description);

      for (let i = 0; i < formData.images.length; i++) {
        formSubmit.append("images", formData.images[i]);
      }

      const res = await axios.post(`${apiUrl}/book/create`, formSubmit);
      if (res.status === 200) {
        setFormData({
          name: "",
          price: 0,
          description: "",
          images: [],
        });
        alert("Tao sach thanh cong");
      } else {
        alert("Tao sach that bai");
      }
      setIsLoading(false);
    } catch (error) {
      alert("Error");
      setIsLoading(false);
    }
  };
  console.log(formData);

  return (
    <div className="book-add">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h1 className="form-title">Add book for admin</h1>
        <div className="input_field">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Name"
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input_field">
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            placeholder="Price"
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input_field">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input_field">
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => handleFileInputChange(e)}
          />
        </div>

        <button
          className="form-btn"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
        {isLoading && <Loading />}
      </form>
    </div>
  );
};

export default BookAdd;
