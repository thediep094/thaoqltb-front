import React from "react";
import CollectionProducts from "../../components/CollectionProducts";
import GioiThieu from "./GioiThieu";
import SachMoi from "./SachMoi";

const Home = () => {
  return (
    <div className="home">
      <GioiThieu />
      {/* <CollectionProducts /> */}
      <SachMoi />
    </div>
  );
};

export default Home;
