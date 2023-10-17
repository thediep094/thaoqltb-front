import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./modules/features/login/Login";
import Header from "./components/Header";
import Register from "./modules/features/register/Register";
import Home from "./modules/features/home/Home";
import BookAdd from "./modules/features/book-add/BookAdd";
import BookDetail from "./modules/features/book-detail/BookDetail";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} exact />
          <Route index path="/addbook" element={<BookAdd />} exact />
          <Route index path="/book/:id" element={<BookDetail />} exact />

          <Route index path="/login" element={<Login />} exact />
          <Route index path="/register" element={<Register />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
