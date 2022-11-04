import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import { notifyError } from "./ToastifyMessages";

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
  const [cartData, setCartData] = useState<ProductDetail[] | null>(null);

  const getCart = async () => {
    try {
      const response = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
        },
      });
      console.log(response);
      setCartData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) notifyError(err.response.data);
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
      <div className="bg-[#E1FCFF] h-2/3 m-10 shadow-md overflow-y-auto rounded-md">
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
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
