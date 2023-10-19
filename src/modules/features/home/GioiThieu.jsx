import {
  ArrowBackIosNew,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowForwardIos,
  FlashOn,
  GppGood,
  Star,
  ThumbUpAlt,
} from "@mui/icons-material";

import { DeCu } from "../../../data/DeCu";
import { PhoBien } from "../../../data/PhoBien";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/modules/GioiThieu.scss";
import axios from "axios";
import { apiImages, apiUrl } from "../../../common/apiUrl";
const GioiThieu = () => {
  const [banChaySlide, setBanChaySlide] = useState(0);
  const bamNextSlide = () => {
    if (banChaySlide < books.length - 1) {
      setBanChaySlide(banChaySlide + 1);
    } else if (banChaySlide === books.length - 1) {
      setBanChaySlide(0);
    }
  };
  const bamPrevSlide = () => {
    if (banChaySlide > 0) {
      setBanChaySlide(banChaySlide - 1);
    } else if (banChaySlide === 0) {
      setBanChaySlide(books.length - 1);
    }
  };

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
    <>
      <div className="GioiThieu">
        <div className="GioiThieu__trai">
          <img src={process.env.PUBLIC_URL + "GioiThieu.png"} alt="" />
          <div className="GioiThieu__trai--thongtin">
            <p>QUAY TRỞ LẠI TRƯỜNG</p>
            <h1>Giảm giá 50%</h1>
            <h2>Dành cho sinh viên, học sinh</h2>
            <h3>
              Dành cho công đồng học sinh việt nam.Mong rằng trí tuệ sẽ trở
              thành người bạn đồng hành của bạn đọc trên mọi hành trình cuộc
              sống và kỹ năng mà Học cách sống - Sống bằng cả trái tim truyền
              tải sẽ là phương tiện giúp bạn vượt qua mọi chông gai, thử thách
              để vươn đến những thành công.
            </h3>
            <div className="GioiThieu__trai--thongtin--button">
              <Link to="/theloai">
                <button className="GioiThieu__trai--buttonXemdanhsach">
                  Xem danh sách
                </button>
              </Link>
              <Link to="/theloai">
                <button className="GioiThieu__trai--buttonXemthem">
                  Xem thêm
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="GioiThieu__phai">
          {books.map((item, index) => {
            return (
              <div
                className={
                  index === banChaySlide
                    ? "GioiThieu__phai--sildeitem active"
                    : "GioiThieu__phai--sildeitem"
                }
                key={index}
              >
                <img
                  src={`${apiImages}/${item.images[0]}`}
                  alt=""
                  className="GioiThieu__phai--sildeitem--hinhnen"
                />
                <div className="Gioithieu__phai--sildeitem--thongtin">
                  <h1>Bán chạy</h1>
                  <p>Giảm giá tuần này</p>
                  <img src={`${apiImages}/${item.images[0]}`} alt="" />
                  <h2
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </h2>
                  <Link to={`/book/${item._id}`}>
                    <button className="GioiThieu__phai--sildeitem--giatien">
                      {item.price} VNĐ
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
          <ArrowCircleLeft
            className="GioiThieu__phai--icon trai"
            onClick={bamPrevSlide}
          />
          <ArrowCircleRight
            className="GioiThieu__phai--icon phai"
            onClick={bamNextSlide}
          />
        </div>
      </div>
      <div className="GioiThieu__duoi">
        <div className="GioiThieu__duoi__tren">
          <div className="GioiThieu__duoi--item">
            <div className="GioiThieu__duoi__item__trai">
              <GppGood className="GioiThieu__duoi__item__trai--icon" />
            </div>
            <div className="GioiThieu__duoi__item__phai">
              <h1>Bảo Mật Cao</h1>
              <p>Đảm bảo an toàn trong các giao dịch của khách hàng</p>
            </div>
          </div>
          <div className="GioiThieu__duoi--item">
            <div className="GioiThieu__duoi__item__trai">
              <ThumbUpAlt className="GioiThieu__duoi__item__trai--icon" />
            </div>
            <div className="GioiThieu__duoi__item__phai">
              <h1>Chất Lượng Tốt Nhất</h1>
              <p>Đảm bảo sách là hàng thật, giá thật, chất lượng tốt</p>
            </div>
          </div>
          <div className="GioiThieu__duoi--item">
            <div className="GioiThieu__duoi__item__trai">
              <Star className="GioiThieu__duoi__item__trai--icon" />
            </div>
            <div className="GioiThieu__duoi__item__phai">
              <h1>Đánh Giá Cao</h1>
              <p>Được đánh giá cao bởi nhiều khách hàng và người tiêu dùng.</p>
            </div>
          </div>
        </div>
        <div className="GioiThieu__duoi__duoi">
          <div
            className="GioiThieu__duoi__duoi--decu"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + "/DeCu.png"})`,
            }}
          >
            <h1>Sách Đề Cử Cho Bạn</h1>
            <p>
              Danh sách các cuốn sách đươc đề cử bởi các biên tập viên và các
              nhà sáng tạo nội dung.
            </p>
            <div className="GioiThieu__duoi__duoi--decu--slide">
              {DeCu.map((item, index) => {
                return (
                  <div
                    className="GioiThieu__duoi__duoi--decu--silde--item"
                    key={index}
                  >
                    <img
                      src={process.env.PUBLIC_URL + item.imgUrl || item.imgUrl}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <Link to="/theloai" className="GioiThieu__duoi__duoi--decu--button">
              Xem Thêm{" "}
            </Link>
          </div>
          <div
            className="GioiThieu__duoi__duoi--phobien"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/PhoBien.png"
              })`,
            }}
          >
            <h1>Sách Đề Cử Cho Bạn</h1>
            <p>
              Danh sách các cuốn sách đươc đề cử bởi các biên tập viên và các
              nhà sáng tạo nội dung.
            </p>
            <div className="GioiThieu__duoi__duoi--phobien--slide">
              {PhoBien.map((item, index) => {
                return (
                  <div
                    className="GioiThieu__duoi__duoi--phobien--silde--item"
                    key={index}
                  >
                    <img
                      src={process.env.PUBLIC_URL + item.imgUrl || item.imgUrl}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <Link
              to="/theloai"
              className="GioiThieu__duoi__duoi--phobien--button"
            >
              Xem Thêm
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default GioiThieu;
