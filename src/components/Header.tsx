import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (googleData: any) => {
    console.log(googleData);
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
        token: googleData?.credential,
      });

      setUser(result.data.user);
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
      <div className="mr-4 flex gap-x-4">
        <div>
          <img src={User} alt="user" className="cursor-pointer" />
        </div>
        <img
          src={Cart}
          alt="cart"
          className="cursor-pointer"
          onClick={() => navigate("/cart")}
        />
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
      </div>
    </div>
  );
};

export default Header;
