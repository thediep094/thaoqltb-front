import "../../../styles/modules/SachMoi.scss";
import { BookmarkAddOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiImages, apiUrl } from "../../../common/apiUrl";
const SachMoi = () => {
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
  console.log(books);
  return (
    books.length > 0 && (
      <div className="SachMoi">
        <img src={process.env.PUBLIC_URL + "PhoBien.png"} alt="" />
        <div className="SachMoi__trai">
          <div className="SachMoi__trai__title">
            <h1>Sách Mới</h1>
            <p>
              Sách Mới Phát Hành - Nhà sách trên mạng lớn nhất Việt nam, với
              trên 30000 đầu sách các loại gồm các chủ đề như: Kinh tế, văn học,
              tin học, thiếu nhi..., ...
            </p>
          </div>
          <div className="SachMoi__trai__sach">
            <Link to="/theloai">
              <div className="SachMoi__trai__sach__hinhanh">
                <img src={`${apiImages}/${books[0].images[0]}`} alt="" />
              </div>
            </Link>
            <div className="SachMoi__trai__sach__thongtin">
              <div className="SachMoi__trai__sach__thongtin__name">
                <BookmarkAddOutlined className="SachMoi__trai__sach__thongtin__name--icon" />
                <div className="SachMoi__trai__sach__thongtin__name__phai">
                  <div>
                    <h1>{books[0].name}</h1>
                  </div>
                </div>
              </div>
              <p>{books[0].description}</p>
              <div className="SachMoi__trai__sach__thongtin__gia">
                <h1>{books[0].price} VNĐ</h1>
                <Link
                  to="/theloai"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div className="SachMoi__trai__sach__thongtin__gia__mua">
                    <ShoppingCartOutlined className="SachMoi__trai__sach__thongtin__gia__mua__icon" />
                    <h1>Xem thêm</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="SachMoi__phai">
          {books.map((item, index) => {
            return (
              <div className="SachMoi__phai__item" key={index}>
                <Link
                  to={`/book/${item._id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <img src={`${apiImages}/${item.images[0]}`} alt="" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default SachMoi;
