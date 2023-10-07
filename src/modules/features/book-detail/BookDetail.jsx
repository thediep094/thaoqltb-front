import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiImages, apiUrl } from "../../../common/apiUrl";
import Loading from "../../../components/Loading";
import "../../../styles/modules/BookDetail.scss";

const BookDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/book/${id}`);
      const data = res.data;
      setData(data.data);
      console.log(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="book-detail">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="book-detail-wrapper">
          {data?.images.map((image) => {
            return <img src={`${apiImages}/${image}`} alt="" />;
          })}

          <h1>{data?.name}</h1>
          <div className="book-detail__field">{data?.price}</div>
          <div
            className="book-detail__field"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
