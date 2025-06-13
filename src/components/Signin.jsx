
import React, { useState } from "react";
import authService from "../authservice/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice.jsx";
import { Button, Input, Logo } from "./index.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0EF] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-[#BBBDBC]">
        <div className="flex justify-center mb-4 sm:mb-6">
          <span className="inline-block w-20 sm:w-24">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#245F73]">
          Create your account
        </h2>
        <p className="text-center text-sm sm:text-base text-[#733E24] mt-1 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#245F73] hover:text-[#733E24] hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-4 text-center text-sm sm:text-base font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-sm sm:text-base"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-sm sm:text-base"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full bg-white text-[#245F73] border-[#BBBDBC] rounded-lg px-4 py-2 text-sm sm:text-base"
            {...register("password", {
              required: true,
            })}
          />

          <Button 
            type="submit" 
            className="w-full px-4 py-2 bg-[#245F73] text-[#F2F0EF] text-sm sm:text-base font-medium rounded-lg hover:bg-[#733E24] transition-all duration-300"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;