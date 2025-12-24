import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = (data) => {
    axios.post(
      "https://gpt-clone-zoro.onrender.com/api/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true, 
      }
    ).then((res) => {
      console.log(res);
      // 1. Success Toast
      toast.success("Welcome back! Login Successful."); 
      setAuth(true); 
      reset();
      navigate('/');
    }).catch((err) => {
      console.error(err);
      // 2. Dynamic Error Message (Agar backend se message aa raha ho)
      const errorMsg = err.response?.data?.message || "Invalid email or password!";
      toast.error(errorMsg);
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#121212] px-4 py-2">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full max-w-md p-6 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-md"
      >
        <h1 className="text-white font-bold text-3xl text-center">Sign In</h1>
        <p className="text-gray-300 text-center text-sm mt-2">
          Welcome back, We've missed you.
        </p>

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="you@example.com"
          className="mt-6 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Enter password"
          className="mt-4 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-6 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Sign In
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to='/register' className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
