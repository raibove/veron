import Product from "./Product";
import LandingImage from "../assets/landing.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
  const [electronics, setElectronics] = useState(null);
  const [jewelery, setJewelery] = useState(null);
  const [menClothing, setMenClothing] = useState(null);
  const [womenClothing, setWomenClothing] = useState(null);

  const getElectronics = async () => {
    try {
      const tempElectronics = await axios.get(
        "https://fakestoreapi.com/products/category/electronics"
      );
      setElectronics(tempElectronics.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getJewelery = async () => {
    try {
      const tempJewelery = await axios.get(
        "https://fakestoreapi.com/products/category/jewelery"
      );
      setJewelery(tempJewelery.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMenClothing = async () => {
    try {
      const tempMenClothing = await axios.get(
        "https://fakestoreapi.com/products/category/men's clothing"
      );
      setMenClothing(tempMenClothing.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getWomenClothing = async () => {
    try {
      const tempWomenClothing = await axios.get(
        "https://fakestoreapi.com/products/category/women's clothing"
      );
      setWomenClothing(tempWomenClothing.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getElectronics();
    getJewelery();
    getMenClothing();
    getWomenClothing();
  }, []);

  return (
    <div>
      <Header />
      <div className="relative mt-8">
        <img
          src={LandingImage}
          alt="landing"
          className="w-screen h-1/3 md:h-1/6"
        />
        <h3 className="text-[#00baab]  absolute right-[45%] bottom-2/3 drop-shadow-lg  border-slate-400 text-xl md:text-4xl lg:text-6xl">
          Veron
        </h3>
        <p className="subpixel-antialiased text-white absolute left-1/4 md-left-1/4 top-[42%] text-xs md:text-2xl lg:text-4xl">
          Ecommerce reimagined for sustainable lifestyle
        </p>
      </div>
      <div className="mb-40">
        {jewelery !== null && <Product title="Jewelery" data={jewelery} />}
        {menClothing !== null && (
          <Product title="Men Clothing" data={menClothing} />
        )}
        {womenClothing !== null && (
          <Product title="Women Clothing" data={womenClothing} />
        )}
        {electronics !== null && (
          <Product title="Electronics" data={electronics} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Landing;
