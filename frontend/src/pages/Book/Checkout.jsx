import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCart, selectTotalPrice } from "../../Redux/cart/cartSlice";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../Redux/order/orderApi";
import Swal from "sweetalert2"; // Import SweetAlert

const Checkout = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentUser } = useAuth();
  const cartItems = useSelector(selectCart);
  const totalPrice = useSelector(selectTotalPrice);
  const [createOrder, { data, isError }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    // SweetAlert confirmation before placing the order
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to place this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newOrder = {
          name: formData.name,
          email: currentUser?.email,
          address: {
            city: formData.city,
            country: formData.country,
            state: formData.state,
            zipcode: formData.zipcode,
          },
          phone: formData.phone,
          productIds: cartItems.map((items) => items._id),
          totalPrice: totalPrice,
        };
        try {
          const res = await createOrder({ ...newOrder });

          // Show success message if order is placed successfully
          Swal.fire({
            title: "Order Placed!",
            text: "Your order has been placed successfully.",
            icon: "success",
          });
          navigate("/orders");
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "There was an issue placing your order. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Cash On Delivery
            </h2>
            <p className="text-gray-500 mb-2">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-500 mb-6">Items: {cartItems?.length}</p>
          </div>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label html="email">Email Address</label>
                    <input
                      {...register("email", { disabled: true })}
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue={currentUser?.email}
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label html="phone">Phone Number</label>
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      name="phone"
                      id="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="+123 456 7890"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      {...register("address", { required: true })}
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      {...register("city", { required: true })}
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        {...register("country", { required: true })}
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        {...register("state", { required: true })}
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      {...register("zipcode", { required: true })}
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        onChange={() => setIsChecked(!isChecked)}
                        value={isChecked}
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        className="form-checkbox"
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I agree to the{" "}
                        <Link className="underline underline-offset-2 text-blue-600">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="underline underline-offset-2 text-blue-600">
                          Shopping Policy.
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        disabled={!isChecked}
                        className={`text-white font-bold py-2 px-4 rounded ${
                          isChecked
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                        }`}
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
