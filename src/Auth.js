import './index.css'

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLoginDisplay, setIsLoginDisplay] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const BASE_URL = "https://trackwallet.onrender.com/api/v1/";
  const handleChange = () => {
    setIsLoginDisplay((prev) => !prev);
    setUserCredentials({
      userName: "",
      email: "",
      password: "",
    });
  };

  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (isLoginDisplay) {
        // Check validation only for email and password
        const isLoginFormValid =
          userCredentials.email.trim() !== "" &&
          userCredentials.password.trim() !== "";

        if (!isLoginFormValid) {
          // Display an error message or take other actions
          toast.error("Email and Password are required", { duration: 1000 });
          return;
        }
        const res = await axios.post(
          `${BASE_URL}login`,
          userCredentials
        );

        localStorage.setItem("userName", res.data.userName);
        toast.success(res.data.message, {
          position: "top-center",
          duration: 1000,
        });
        // Set timeout for navigation
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Check validation for all fields
        const isFormValid = Object.values(userCredentials).every(
          (value) => value.trim() !== ""
        );

        if (!isFormValid) {
          // Display an error message or take other actions
          toast.error("All fields are required", { duration: 1000 });
          return;
        }
        const res = await axios.post(
          `${BASE_URL}register`,
          userCredentials
        );
        localStorage.setItem("userName", res.data.userName);
        toast.success(res.data.message, {
          position: "top-center",
          duration: 1000,
        });
        // Set timeout for navigation
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message, { duration: 1000 });
    }
  };
  // console.log(import.meta.env.VITE_API_KEY )
  return (
    <div className="bg-[#F2F2F2] w-screen h-screen  px-52 py-16">
      <div className="w-full h-full bg-white  rounded-2xl shadow-2xl flex flex-col items-center py-8">
        <p className="text-[#474444] text-[5.25rem] font-jomhuria">TrackWallet</p>
        <div className="w-1/2 flex items-center justify-around font-poppins">
          <button
            className={`${
              isLoginDisplay
                ? " w-1/3 hover:bg-blue-300 py-1 rounded-lg"
                : "border rounded-lg   bg-white shadow-[0px_0px_50px_rgba(0,_25,_255,_0.24)] w-1/3 py-1 hover:bg-blue-300"
            }  `}
            onClick={handleChange}
          >
            {"Sign Up"}
          </button>
          <button
            className={`${
              isLoginDisplay
                ? "border rounded-lg   bg-white shadow-[0px_0px_50px_rgba(0,_25,_255,_0.24)] w-1/3 py-1 hover:bg-blue-300"
                : " w-1/3 hover:bg-blue-300 py-1 rounded-lg"
            }  `}
            onClick={handleChange}
          >
            {"Log In"}
          </button>
        </div>
        <form className="flex flex-col justify-around items-center mt-14  w-1/2 ">
          {!isLoginDisplay && (
            <div className=" flex w-full mb-4">
              <span className=" text-lg text-right w-1/2">Name</span>
              <input
                type="text"
                required
                className="w-full ml-4 rounded-t-md rounded-b-none bg-gray-100 py-1 px-1 text-lg"
                value={userCredentials.userName}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    userName: e.target.value,
                  })
                }
              />
            </div>
          )}
          <div className=" flex text-right w-full mb-4">
            <span className=" text-lg w-1/2">Email</span>
            <input
              type="text"
              required
              className="w-full ml-4 rounded-t-md rounded-b-none bg-gray-100 py-1 px-1 text-lg"
              value={userCredentials.email}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="flex text-right w-full mb-4">
            <span className="text-lg w-1/2">Password</span>
            <input
              type="text"
              required
              className="w-full ml-4 rounded-t-md rounded-b-none bg-gray-100 py-1 px-1 text-lg"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-4 w-full text-center">
            <button
              className="bg-[#A9BCFF] w-1/2 rounded-lg py-1 text-white text-lg"
              onClick={handleCreateNewUser}
            >
              {isLoginDisplay ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
