import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../common/apiUrl";
import BookItem from "./BookItem";
import { Grid } from "@mui/material";
import "../../styles/components/CollectionProducts.scss";
const CollectionProducts = () => {
  const [books, setBooks] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/book/getall?page=1&limit=20`);
      const data = res.data;
      if (res.status === 200) {
        setBooks(data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="collection-products">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {books.map((book, index) => {
          return (
            <Grid item xs={6} sm={2} md={2} key={index}>
              <BookItem data={book} />;
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CollectionProducts;
