import React from "react";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex  md:flex-row py-16 justify-between items-center gap-12 flex-col-reverse">
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl md:text-5xl font-medium">
          New Releases This Week
        </h1>
        <p className="mb-10">
          It's time to update your reading list with soome of the latest and
          gretest releases in the literacy world. From herat-pumping thrillers
          to captivating memories, this week's new releases offer something for
          everyone
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center md:justify-end">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;
