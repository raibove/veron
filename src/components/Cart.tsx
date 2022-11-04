import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { notifyError, notifySuccess } from "./ToastifyMessages";
import { ReactComponent as TreeSvg } from "../assets/tree.svg";

interface ProductDetail {
  _id: string;
  category: string;
  name: string;
  productId: number;
  price: number;
  quantity: number;
  createdAt: number;
  productImage: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<ProductDetail[] | null>(null);

  const checkoutUser = async () => {
    try {
      const response = await axios.get("/cart/checkout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
        },
      });
      console.log(response);
      if (response.data.length === 0) setCartData(null);
      notifySuccess("Checked out succesfully");
    } catch (err) {
      notifyError("Failed to checkout");
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
        },
      });
      if (response.data.length !== 0) setCartData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) {
          localStorage.clear();
          notifyError(err.response.data);
        }
      } else notifyError("Could not get Cart!!");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const getTotalProductPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className="bg-[#0AD8C7] h-screen overflow-y-auto">
      <Header />
      {cartData !== null ? (
        <div className="bg-[#E1FCFF] h-2/3 m-10 mb-4 shadow-md overflow-y-auto rounded-md">
          <div className="flex mt-10 mb-5 py-2">
            <h3 className="font-semibold text-gray-600 text-sm md:text-lg uppercase w-1/5 text-center">
              Product Details
            </h3>
            <h3 className="font-semibold  text-gray-600 text-sm md:text-lg  uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold  text-gray-600 text-sm md:text-lg uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold  text-gray-600 text-sm md:text-lg uppercase w-1/5 text-center">
              Total
            </h3>
            <h3 className="font-semibold  text-gray-600 text-sm md:text-lg uppercase w-1/5 text-center">
              Reward
            </h3>
          </div>
          {cartData !== null && (
            <>
              {cartData.map((product) => (
                <div
                  className="m-4 py-2 bg-white flex  items-center"
                  key={product.productId}
                >
                  <div className="justify-evenly flex w-1/5 ">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src={product.productImage}
                        alt="product"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="font-bold text-sm md:text-base">
                        {product.name}
                      </span>
                      <span className="text-red-500 text-xs">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span className="p-2 border-slate-400 text-sm md:text-lg">
                      {product.quantity}
                    </span>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span className="p-2 border-slate-400 font-semibold text-sm md:text-lg">
                      ${product.price}
                    </span>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span className="p-2 border-slate-400 font-semibold text-sm md:text-lg">
                      ${getTotalProductPrice(product.quantity, product.price)}
                    </span>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <TreeSvg className="h-8 w-8" />{" "}
                    <span className="text-lg font-semibold"> &nbsp; 100</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="bg-[#E1FCFF] h-2/3 m-10 mb-4 shadow-md overflow-y-auto rounded-md flex align-center justify-center">
          <p className=" text-2xl">Cart Is Empty</p>
        </div>
      )}
      <div className=" mx-10 py-4 flex justify-evenly items-start">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Continue shopping
        </span>
        {cartData !== null && (
          <button
            className="px-5 py-2 text-base text-white rounded-md md:text-lg bg-red-500 hover:bg-red-600 "
            onClick={checkoutUser}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
