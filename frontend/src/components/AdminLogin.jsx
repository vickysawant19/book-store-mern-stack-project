import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getBaseUrl } from "../utils/getBaseUrl";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Login expired.Please Login Again!");
          navigate("/admin");
        }, 1000 * 60 * 60);
      }
      alert("Admin login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("error occureed while login :" + error);
    }
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="border w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 py-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", {
                required: true,
              })}
              className="shadow appearance-none border rounded w-full px-4 py-2 mb-2 leading-tight focus:outline-none  focus:shadow-blue-300"
              id="username"
              name="username"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-400 mb-2">Please enter valid username</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              className="shadow appearance-none border rounded w-full px-4 py-2 mb-2 leading-tight focus:outline-none  focus:shadow-blue-300"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 mb-2">Please enter valid password</p>
          )}
          <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded focus:outline-none w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
