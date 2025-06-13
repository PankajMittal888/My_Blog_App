
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../authservice/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0EF] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-[#BBBDBC] rounded-xl shadow-md p-6 sm:p-8">
        <div className="flex justify-center mb-4">
          <div className="w-24">
            <Logo width="100%" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-[#245F73]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#733E24]">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#245F73] hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
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
            {...register("password", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="w-full py-2 bg-[#245F73] text-[#F2F0EF] font-medium text-sm sm:text-base rounded-lg hover:bg-[#733E24] transition-all"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
