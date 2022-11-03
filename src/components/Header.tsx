import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const notifyError = () => {
  toast.error("Login to proceed!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const Header = () => {
  const [user, setUser] = useState<Users | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") !== undefined &&
      localStorage.getItem("isLoggedIn") === "true"
      ? "true"
      : "false";
  });

  const navigate = useNavigate();

  const handleLogin = async (googleData: any) => {
    console.log(googleData);
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
        token: googleData?.credential,
      });

      setUser(result.data.user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("veronToken", result.data.token);
      setIsLoggedIn("true");
    } catch (e) {
      console.log(e);
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
        {/* <div>
          <img src={User} alt="user" className="cursor-pointer" />
        </div> */}
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
              : notifyError();
          }}
        />
      </div>
    </div>
  );
};

export default Header;
