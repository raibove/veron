import User from "../assets/user.svg";
import Cart from "../assets/cart.svg";

const Header = () => {
  return (
    <div className="h-20 bg-white shadow-lg flex items-center w-screen justify-between">
      <h1 className="text-[#008F83] font-bold text-4xl font-mono ml-4 cursor-default">
        Veron
      </h1>
      <div className="mr-4 flex gap-x-4">
        <img src={User} alt="user" className="cursor-pointer" />
        <img src={Cart} alt="cart" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
