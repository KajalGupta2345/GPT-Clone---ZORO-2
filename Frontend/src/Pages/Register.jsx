import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Toast import kiya

const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          email: data.email,
          fullName: {
            firstName: data.firstname,
            lastName: data.lastname,
          },
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.status === 200) {
        // 1. Success Toast
        toast.success("Account created successfully! Please login.");
        reset();
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      // 2. Error Toast (Backend ka message ya generic message)
      const errorMsg = err.response?.data?.message || "Registration failed. Try again!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#121212] px-4 py-2">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full max-w-md p-6 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-md"
      >
        <h1 className="text-white font-bold text-3xl text-center">Sign Up</h1>
        <p className="text-gray-300 text-center text-sm mt-2">
          Join us and start exploring.
        </p>

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="you@example.com"
          className="mt-6 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            {...register("firstname", { required: true })}
            placeholder="First Name"
            className="w-1/2 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            {...register("lastname", { required: true })}
            placeholder="Last Name"
            className="w-1/2 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Create password"
          className="mt-4 px-3 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-6 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Create Account
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;