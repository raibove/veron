import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import Tree1 from "../assets/tree1.svg";
import Tree2 from "../assets/tree2.svg";
import Tree3 from "../assets/tree3.svg";
import Tree4 from "../assets/tree4.svg";
import Tree5 from "../assets/tree5.svg";
import Tree6 from "../assets/tree6.svg";
import Tree7 from "../assets/tree7.svg";
import Tree8 from "../assets/tree8.svg";
import Tree9 from "../assets/tree9.svg";
import Tree10 from "../assets/tree10.svg";
import { notifyError, notifySuccess } from "./ToastifyMessages";

const Rewards = () => {
  const [points, setPoints] = useState(0);

  const getRewards = async () => {
    let response = await axios.get("/rewards", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
      },
    });

    setPoints(response.data.points);
  };

  useEffect(() => {
    getRewards();
  }, []);

  const images = [
    Tree1,
    Tree2,
    Tree3,
    Tree4,
    Tree5,
    Tree6,
    Tree7,
    Tree8,
    Tree9,
    Tree10,
  ];

  const getCost = (index: number) => {
    return (index + 1) * 100;
  };

  const getImageByKey = (key: number) => {
    return images[key];
  };

  const claimReward = async (currentPoints: number) => {
    try {
      const response = await axios.post(
        "/rewards/claim",
        { points: currentPoints },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("veronToken")}`,
          },
        }
      );
      let newPoints = points - currentPoints;
      setPoints(newPoints);
      notifySuccess("Reward claimed successfully");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) {
          localStorage.clear();
          notifyError(err.response.data);
        }
      } else notifyError("Could not get Reward!!");
    }
  };

  return (
    <div className="bg-[#0AD8C7] h-screen overflow-y-auto">
      <Header />
      <div>
        <div className="p-8 w-screen">
          <h2 className="text-xl float-right font-medium text-white">
            Current Points: {points}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 m-10">
          {[...Array(10)].map((e, index) => (
            <div className="shrink-0 bg-white h-48 w-36 flex flex-col justify-around rounded-md md:h-52 md:w-48">
              <img src={getImageByKey(index)} alt="tree" className="p-2" />
              <div className="bg-yellow-300 p-2 flex justify-around">
                <p className="font-semibold">{getCost(index)}</p>
                <button
                  className="p-2 rounded-xl text-white  bg-yellow-600"
                  onClick={() => claimReward(getCost(index))}
                >
                  Plant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
