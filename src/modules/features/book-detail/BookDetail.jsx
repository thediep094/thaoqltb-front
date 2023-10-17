import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiImages, apiUrl } from "../../../common/apiUrl";
import Loading from "../../../components/Loading";
import "../../../styles/modules/BookDetail.scss";
import {
  Comment,
  Facebook,
  FavoriteBorder,
  Instagram,
  ShoppingCartOutlined,
  Star,
  ThumbUp,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";

const BookDetail = () => {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const location = useLocation();

  const [rating, setRating] = useState(0);
  const [currentComment, setCurrentComment] = useState("");
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/book/${id}`);
      const data = res.data;
      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    const res = await axios.get(`${apiUrl}/comment/${id}`);
    setComments(res.data.data);
    console.log(res.data);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location, navigator]);

  useEffect(() => {
    if (id) {
      fetchData();
      fetchComments();
    }
  }, [id]);
  const submitComment = async () => {
    try {
      if (user) {
        const res = await axios.post(`${apiUrl}/comment/${id}`, {
          userId: user?._id,
          rate: rating,
          cmt: currentComment,
        });
        setCurrentComment("");
        setRating(0);
      } else {
        alert("Bạn cần đăng nhập");
      }
    } catch (error) {
      console.log(error);
    }
    fetchComments();
  };

  const convertDate = (string) => {
    const inputDate = new Date(string);

    const day = String(inputDate.getUTCDate()).padStart(2, "0");
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const year = String(inputDate.getUTCFullYear()).slice(0);

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const averageStar = useMemo(() => {
    const total = comments.reduce((total, comment) => {
      return comment.rate + total;
    }, 0);

    return total / comments.length;
  }, [comments]);
  console.log(averageStar);
  return (
    <div className="book-detail">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="ChiTietSach">
          <div className="ChiTietSach__tren">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                to="/"
                className="ChiTietSach__tren__link"
              >
                Trang chủ
              </Link>

              <Typography color="text.primary">name</Typography>
            </Breadcrumbs>
          </div>
          <div className="ChiTietSach__duoi">
            <div className="ChiTietSach__duoi__thongtin">
              <div className="ChiTietSach__duoi__thongtin__anh">
                <img src={`${apiImages}/${data?.images[0]}`} alt="anh" />
              </div>
              <div className="ChiTietSach__duoi__thongtin__phai">
                <div className="ChiTietSach__duoi__thongtin__phai__title">
                  <div className="ChiTietSach__duoi__thongtin__phai__title__trai">
                    <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren">
                      <h1>{data?.name}</h1>
                    </div>
                    <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi">
                      <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao">
                        {[1, 2, 3, 4, 5].map((item1, index) => {
                          return (
                            <Star
                              className={
                                item1 <= averageStar
                                  ? "ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__chuan active"
                                  : "ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__chuan"
                              }
                              key={index}
                            />
                          );
                        })}
                      </div>
                      <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__so">
                        {averageStar.toFixed(2)}
                      </div>
                      <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__comment">
                        <Comment className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__comment__icon" />
                        <p>{comments.length} bình luận</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ChiTietSach__duoi__thongtin__phai__mota">
                  <p>{data?.description}</p>
                </div>
              </div>
            </div>
            <div className="ChiTietSach__duoi__comment">
              <div className="ChiTietSach__duoi__comment__title">
                <h1>Đánh giá sách</h1>
              </div>
              <input
                type="text"
                placeholder="Write comment here"
                onChange={(e) => setCurrentComment(e.target.value)}
              />
              <div className="product__stars">
                {[1, 2, 3, 4, 5].map((index) => {
                  return index <= rating ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-star-good"
                      onClick={() => setRating(index)}
                    >
                      <path
                        d="M8.84456 0.749867C9.31736 -0.249956 10.6833 -0.249956 11.1552 0.749867L13.5477 5.8121L18.8951 6.62347C19.9527 6.78408 20.3739 8.14131 19.6096 8.92019L15.7392 12.8601L16.6529 18.4236C16.8342 19.5228 15.7286 20.361 14.7839 19.8421L9.99901 17.2149L5.2168 19.8421C4.2712 20.362 3.16652 19.5228 3.34693 18.4236L4.26054 12.8601L0.390161 8.92019C-0.374138 8.14038 0.0480039 6.785 1.10469 6.62347L6.45212 5.8121L8.84367 0.749867H8.84456Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-star-notgood"
                      onClick={() => setRating(index)}
                    >
                      <path
                        d="M7.3563 6.23926L9.47722 1.74987H9.47785L9.74858 1.17736C9.81277 1.0416 9.91094 1 10.0002 1C10.0894 1 10.1871 1.04147 10.2509 1.1767L10.2511 1.17716L12.6435 6.23939L12.8711 6.7209L13.3977 6.80079L18.745 7.61214C18.845 7.62732 18.9364 7.69464 18.9806 7.8368C19.0253 7.98044 18.9932 8.12029 18.8963 8.2194C18.8962 8.21942 18.8962 8.21944 18.8962 8.21946C18.8961 8.21957 18.896 8.21968 18.8959 8.21979L15.0259 12.1593L14.6702 12.5213L14.7525 13.0221L15.6661 18.5856L15.6662 18.5863C15.6934 18.7511 15.6281 18.8733 15.5362 18.943C15.4894 18.9785 15.4421 18.9949 15.4029 18.9987C15.3684 19.002 15.324 18.9979 15.2653 18.9656L15.2652 18.9655L10.4803 16.3383L9.99887 16.074L9.51751 16.3385L4.73531 18.9657L4.73503 18.9658C4.67602 18.9983 4.63148 19.0024 4.5972 18.9991C4.55811 18.9953 4.51097 18.9789 4.4642 18.9434C4.37226 18.8737 4.3066 18.751 4.33372 18.5856C4.33372 18.5856 4.33372 18.5856 4.33373 18.5856L5.24732 13.0221L5.32956 12.5213L4.97391 12.1593L1.10433 8.22021C1.10433 8.22021 1.10432 8.2202 1.10432 8.2202C1.00658 8.12047 0.974765 7.9805 1.01938 7.83715C1.06352 7.69534 1.15506 7.62751 1.25548 7.61204C1.25559 7.61202 1.25569 7.61201 1.2558 7.61199L6.60214 6.80079L7.12877 6.72088L7.3563 6.23926Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  );
                })}
              </div>
              <div
                className="product__comment-user submit"
                onClick={() => submitComment()}
              >
                Submit
              </div>
              <div className="ChiTietSach__duoi__comment__title">
                <h1>Bình luận</h1>
              </div>
              <div className="ChiTietSach__duoi__comment__noidung">
                {comments.length > 0 &&
                  comments.map((item, index) => {
                    return (
                      <div
                        className="ChiTietSach__duoi__comment__noidung__item"
                        key={index}
                      >
                        <div className="ChiTietSach__duoi__comment__noidung__item__trai">
                          <div className="ChiTietSach__duoi__comment__noidung__item__trai__avatar">
                            <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                            />
                            <div className="ChiTietSach__duoi__comment__noidung__item__trai__avatar__name">
                              <h2>{item.username[0]}</h2>
                              <p>{convertDate(item.updatedAt)}</p>
                            </div>
                          </div>
                          <div className="ChiTietSach__duoi__comment__noidung__item__trai__comment">
                            <p>{item.cmt}</p>
                          </div>
                        </div>
                        <div className="ChiTietSach__duoi__comment__noidung__item__phai">
                          <div className="ChiTietSach__duoi__comment__noidung__item__phai__sosao">
                            <h2>{item.rate}.0</h2>
                          </div>
                          <div className="ChiTietSach__duoi__comment__noidung__item__phai__danhgia">
                            {[1, 2, 3, 4, 5].map((item1, index) => {
                              return (
                                <Star
                                  className={
                                    item1 <= item.rate
                                      ? "ChiTietSach__duoi__comment__noidung__item__phai__danhgia__sao active"
                                      : "ChiTietSach__duoi__comment__noidung__item__phai__danhgia__sao"
                                  }
                                  key={index}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
