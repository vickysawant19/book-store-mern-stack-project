import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import avatorImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { selectCart } from "../Redux/cart/cartSlice";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector(selectCart);
  const popup = useRef(null);

  const navObj = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Orders",
      href: "/orders",
    },
    {
      name: "Cart page",
      href: "/cart",
    },
    {
      name: "Checkout",
      href: "/checkout",
    },
  ];
  const { currentUser, logoutUser } = useAuth();

  useEffect(() => {
    let windowListner = window.addEventListener("click", (e) => {
      if (popup.current && !popup.current.contains(e.target)) {
        setIsDropDownOpen(false);
      }
    });

    return window.removeEventListener("click", windowListner);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsDropDownOpen(false);
  };

  return (
    <nav className="max-w-screen-xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        {/* left side  */}
        <div className="flex md:gap-16 gap-4 items-center">
          <NavLink to={"/"}>
            <HiMiniBars3CenterLeft className="size-6" />
          </NavLink>
          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2 flex items-center">
            <IoSearchOutline className="absolute inline-block left-3" />
            <input
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              type="text"
              placeholder="Search here"
            />
          </div>
        </div>
        {/* right side */}
        <div className="flex items-center  relative md:space-x-3 space-x-2">
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <div className="flex space-x-4">
                  <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                    <img
                      ref={popup}
                      src={currentUser?.photoURL || avatorImg}
                      className={`size-7 rounded-full ${
                        currentUser ? "ring-1 ring-gray-500" : ""
                      }`}
                    />
                  </button>
                </div>
                {isDropDownOpen && (
                  <>
                    <div className="bg-white w-48 rounded-md absolute right-0 mt-8 z-40 shadow-lg ">
                      <ul className="py-2">
                        {navObj.map((item) => (
                          <li
                            key={item.name}
                            onClick={() => setIsDropDownOpen(false)}
                          >
                            <NavLink
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                              key={item.name}
                              to={item.href}
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="bg-red-400 px-4 ml-4 mt-2 block py-1 rounded text-white font-semibold hover:bg-red-600"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </>
            ) : (
              <Link to={"/login"}>
                <FaUser className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <FaHeart className="size-6" />
          </button>

          <Link
            to={"/cart"}
            className="bg-primary p-1 sm:px-6 px-2 flex items-center  rounded-sm"
          >
            <FaCartShopping className="" />
            <span className="text-sm font-semibold sm:ml-1 ml-2">
              {cartItems ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
