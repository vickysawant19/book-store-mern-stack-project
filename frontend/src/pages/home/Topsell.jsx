import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import BookCard from "../Book/BookCard";

const Topsell = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("data/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    if (books.length === 0) return;
    let categoryList = {};
    books.forEach((item) => {
      categoryList[item.category] = categoryList[item.category] + 1 || 1;
    });
    setCategory(Object.keys(categoryList));
  }, [books]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks =
    selectedCategory === ""
      ? books
      : books.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-10 ">
      <h2 className="text-3xl mb-6 font-semibold">Top Seller</h2>
      {/* Category filter */}
      <div className="mb-8 flex items-center">
        <select
          onChange={handleCategoryChange}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-grey-300 rounded-md px-4 py-2 focus:outline-none"
        >
          <option value="">Choose a genre</option>
          {category.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper for displaying books */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Topsell;
