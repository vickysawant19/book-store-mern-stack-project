import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  selectCart,
} from "../../Redux/cart/cartSlice";
import { TbShoppingCartExclamation } from "react-icons/tb";

const BookCard = ({ book }) => {
  const [isInCart, setIsInCart] = useState(false);
  const cartItems = useSelector(selectCart);

  const dispatch = useDispatch();

  const getImgUrl = () => {
    return new URL(`../../assets/books/${book?.coverImage}`, import.meta.url);
  };

  useEffect(() => {
    let found = cartItems?.find((item) => item._id === book._id);
    if (found) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartItems]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const HandleRemoveFromCart = () => {
    dispatch(removeFromCart(book._id));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-2  rounded-lg transition-shadow duration-300">
      <div className=" sm:flex-shrink-0  rounded-md sm:w-1/2 w-full ">
        <Link to={`/books/${book._id}`}>
          <img
            src={`${getImgUrl()}`}
            alt=""
            className="w-full h-72 bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>

      <div className="flex flex-col  justify-evenly h-full sm:w-1/2 w-full">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-xl font-semibold hover:text-blue-600 mb-2">
            {book?.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-3">
          {book?.description.length > 80
            ? `${book.description.slice(0, 80)}...`
            : book?.description}
        </p>
        <p className="font-medium mb-3">
          ${book?.newPrice}{" "}
          <span className="line-through font-normal ml-2">
            $ {book?.oldPrice}
          </span>
        </p>
        {isInCart ? (
          <button
            onClick={() => HandleRemoveFromCart()}
            className="px-2 text-center justify-center  text-black font-semibold bg-gray-300 rounded-xl py-2 space-x-1 flex items-center gap-1 text-nowrap border "
          >
            <TbShoppingCartExclamation />
            <span>Remove from Cart</span>
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(book)}
            className="px-2 text-center justify-center  text-black font-semibold bg-yellow-300 rounded-xl py-2 space-x-1 flex items-center gap-1 text-nowrap border "
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
    // </div>
  );
};

export default BookCard;
