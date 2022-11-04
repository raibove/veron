import axios from "axios";
import PlusIcon from "../assets/plus.svg";
import { notifyError, notifySuccess } from "./ToastifyMessages";

const Card = ({ product, title }: any) => {
  const getTitle = () => {
    const temp = product.title.trim();
    const n = temp.split(" ");
    return n[n.length - 1];
  };

  const addToCart = async () => {
    try {
      if (localStorage.getItem("isLoggedIn") !== "true")
        return notifyError("Login to proceed!");
      await axios.post(
        "/cart",
        {
          category: title,
          name: getTitle(),
          productId: product.id,
          price: product.price,
          quantity: 1,
          productImage: product.image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
          },
        }
      );

      notifySuccess("Added to cart!!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) notifyError(err.response.data);
      } else notifyError("Failed to add to cart!!");
    }
  };
  return (
    <div className="border-[#0AD8BB] border-2 h-56 w-56 flex flex-col rounded-md bg-white">
      <div className="flex-1 m-auto">
        <img
          src={product.image}
          alt="card"
          className=" rounded-md ease-out h-40 hover:h-44 w-auto"
        />
      </div>
      <div className="h-12 bg-[#0AD8BB] flex justify-between px-2">
        <div>
          <h5>{getTitle()}</h5>
          <p>$ {product.price}</p>
        </div>
        <img
          src={PlusIcon}
          alt="plus"
          className="cursor-pointer"
          onClick={addToCart}
        />
      </div>
    </div>
  );
};

export default Card;
