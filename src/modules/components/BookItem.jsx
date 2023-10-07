import React from "react";
import { apiImages } from "../../common/apiUrl";
import "../../styles/components/BookItem.scss";
import { Link } from "react-router-dom";
const BookItem = ({ data }) => {
  return (
    <Link to={`book/${data._id}`} className="book-item__link">
      <div className="book-item">
        <img src={`${apiImages}/${data.images[0]}`} alt="" />
        <h1 className="book-item__title">{data.name}</h1>
        <p className="book-item__price">{data.price}</p>
      </div>
    </Link>
  );
};

export default BookItem;
