import Cart from "../assets/cart.svg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "./ToastifyMessages";

interface AuthResponse {
  token: string;
  user: Users;
}

interface Users {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") !== undefined &&
      localStorage.getItem("isLoggedIn") === "true"
      ? "true"
      : "false";
  });

  const navigate = useNavigate();

  const handleLogin = async (googleData: any) => {
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
        token: googleData?.credential,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("veronToken", result.data.token);
      setIsLoggedIn("true");
      notifySuccess("Logged in successfully!!");
    } catch (e) {
      console.log(e);
      notifyError("Failed to log in!!");
    }
  };

  return (
    <div className="h-20 bg-white shadow-lg flex items-center w-screen justify-between">
      <h1
        className="text-[#008F83] font-bold text-4xl font-mono ml-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Veron
      </h1>
      <div className="mr-4 flex gap-x-4 md:mr-16 md:gap-x-10">
        {isLoggedIn === "false" ? (
          <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          >
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => {
                console.log("failed");
              }}
            />
          </GoogleOAuthProvider>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              setIsLoggedIn("false");
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
        <img
          src={Cart}
          alt="cart"
          className="cursor-pointer"
          onClick={() => {
            localStorage.getItem("isLoggedIn") === "true"
              ? navigate("/cart")
              : notifyError("Login to proceed!");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
