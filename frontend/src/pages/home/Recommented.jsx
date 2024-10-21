import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import BookCard from "../Book/BookCard";
import { useGetBooksQuery } from "../../Redux/books/bookApi";
import Loading from "../../components/Loading";

const Recommented = () => {
  const { data: books = [], isLoading } = useGetBooksQuery();

  return (
    <div className="py-10 ">
      <h2 className="text-3xl mb-6 font-semibold">Recommended To You</h2>

      {isLoading ? (
        <Loading />
      ) : (
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
          {books.length > 0 &&
            books.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default Recommented;
