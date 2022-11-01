import LandingImage from "../assets/landing.png";
import PlusIcon from "../assets/plus.svg";

const Card = () => {
  return (
    <div className="border-[#0AD8BB] border-2 h-56 w-56 flex flex-col rounded-md flex-shrink-0">
      <img
        src={LandingImage}
        alt="card"
        className="flex-1 rounded-md m-1 hover:m-0 ease-out"
      />
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
