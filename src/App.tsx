import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Product from "./components/Product";

const App = () => {
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
    <div className="bg-[#F4FFFE] h-screen">
      <Header />
      <Landing />
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
    </div>
  );
};

export default App;
