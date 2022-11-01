import LandingImage from "../assets/landing.png";
const Landing = () => {
  return (
    <div>
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
    </div>
  );
};

export default Landing;
