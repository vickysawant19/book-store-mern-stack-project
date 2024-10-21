import React from "react";
import { useGetOrderByEmailQuery } from "../../Redux/order/orderApi";
import { useAuth } from "../../context/AuthContext";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../../Redux/books/bookApi";
import { getImageUrl } from "../../utils/getImage";

const Orders = () => {
  const { currentUser } = useAuth();
  const {
    data: books = [],
    isLoading: isBookLoading,
    isError: isBookError,
  } = useGetBooksQuery();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading || isBookLoading) return <div>Loading...</div>;
  if (isError || isBookError) return <div>Error occurred during loading</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-6 font-semibold text-center">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-4 my-4 shadow-md bg-white"
          >
            <h2 className="bg-secondary w-full text-white px-2 py-1 rounded">
              {"#" + index}
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              Order Id: <span className="font-normal">{order._id}</span>
            </h3>
            <h3 className="text-lg font-semibold mb-2">
              Name: <span className="font-normal">{order.name}</span>
            </h3>
            <h3 className="text-lg font-semibold mb-2">
              Email: <span className="font-normal">{order.email}</span>
            </h3>
            <div className="mb-4">
              <h4 className="font-semibold">Address:</h4>
              <ul className="ml-4 text-sm">
                {Object.entries(order.address).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Products:</h4>
              <div className="flex flex-wrap space-x-4 overflow-x-auto pb-4">
                {order.productIds.length > 0 &&
                  order.productIds.map((id) => {
                    const book = books.find(({ _id }) => _id === id);
                    if (!book) return "";
                    return (
                      <div
                        key={id}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 "
                      >
                        <div className="border rounded-lg shadow-md p-4 bg-gray-50 flex flex-col items-center space-y-2">
                          <img
                            src={getImageUrl(book?.coverImage || "book-1.png")}
                            alt={book.title}
                            className="w-32 h-40 object-cover rounded-md mb-2"
                          />
                          <h3 className="text-sm font-semibold text-center">
                            {book.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Price: ${book.newPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-4">
              Total Price:=
              <span className="font-normal">{order.totalPrice.toFixed(2)}</span>
            </h3>
          </div>
        ))
      ) : (
        <div className="text-gray-800 text-center">No orders found</div>
      )}
    </div>
  );
};

export default Orders;
