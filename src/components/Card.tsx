import LandingImage from "../assets/landing.png";
import PlusIcon from "../assets/plus.svg";

const Card = ({ product }: any) => {
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
          <h5>Hat</h5>
          <p>$20</p>
        </div>
        <img src={PlusIcon} alt="plus" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Card;
