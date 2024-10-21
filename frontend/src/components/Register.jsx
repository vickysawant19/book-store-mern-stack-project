import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogelRegister = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="border w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 py-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
              })}
              className="shadow appearance-none border rounded w-full px-4 py-2 mb-2 leading-tight focus:outline-none  focus:shadow-blue-300"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-400 mb-2">Please enter valid email</p>
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
              {...register("password", { required: true, minLength: 8 })}
              className="shadow appearance-none border rounded w-full px-4 py-2 mb-2 leading-tight focus:outline-none  focus:shadow-blue-300"
              id="password"
              type="password"
              name="password"
              placeholder="Password Address"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 mb-2">Please enter valid password</p>
          )}
          <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded focus:outline-none w-full">
              Register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Need an account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-700" to={"/login"}>
            Login
          </Link>
        </p>
        {/* google sign in */}
        <div className="mt-4">
          <button
            onClick={handleGoogelRegister}
            className="w-full flex flex-wrap gap-2 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold rounded focus:outline-none py-2"
          >
            <FaGoogle /> <p>Sign in with Google</p>
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-sm">
          @2025 MyBook Store. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Register;
