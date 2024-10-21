import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../../Redux/books/bookApi";
import { getImageUrl } from "../../utils/getImage";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCart,
} from "../../Redux/cart/cartSlice";
import { FiShoppingCart } from "react-icons/fi";

const SingleBook = () => {
  const [inCart, setInCart] = useState(false);
  const { id } = useParams();
  const { data: book = [] } = useGetSingleBookQuery(id);

  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(book._id));
  };

  useEffect(() => {
    const found = cartItems.find((item) => item._id === id);

    if (found) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartItems, book]);

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="  text-2xl font-bold mb-6">{book.title}</h1>
      <div className=" p-2">
        <img className="" src={getImageUrl(book.coverImage)} alt="" />
      </div>
      <div className="mb-5">
        <p className="text-gray-700 mb-2">
          <strong>Auther: </strong>
          {book.author || "admin"}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Published: </strong>
          {new Date(book.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Book Category: </strong>
          {book.category}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description: </strong>
          {book.description}
        </p>
      </div>
      {inCart ? (
        <button
          onClick={() => handleRemoveFromCart(book)}
          className="px-2 text-center justify-center  text-black font-semibold bg-gray-300 rounded-xl py-2 space-x-1 flex items-center gap-1 text-nowrap border "
        >
          <FiShoppingCart />
          <span>Remove from cart</span>
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart(book)}
          className="px-2 text-center justify-center  text-black font-semibold bg-yellow-300 rounded-xl py-2 space-x-1 flex items-center gap-1 text-nowrap border "
        >
          <FiShoppingCart />
          <span>Add to cart</span>
        </button>
      )}
    </div>
  );
};

export default SingleBook;
