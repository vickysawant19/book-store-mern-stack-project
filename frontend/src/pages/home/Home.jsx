import React from "react";
import Banner from "./Banner";
import Topsell from "./Topsell";
import Recommented from "./Recommented";
import News from "./News";

const Home = () => {
  return (
    <>
      <Banner />
      <Topsell />
      <Recommented />
      <News />
    </>
  );
};

export default Home;
