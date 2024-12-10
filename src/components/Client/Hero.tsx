import BgImg from "../../assets/home_background.jpg";
import "../../App.css";
import ReservationSearch from "./ReservationSearch";

const Hero = () => {
  return (
    <section id="home" className="w-full relative">
      <div className="mask">
        <img
          src={BgImg}
          alt="hero_image"
          className="w-full object-cover bg-cover bg-center overflow-hidden"
        />
      </div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
        <h1 className="text-white text-5xl font-bold mb-3 uppercase">
          Connecting You Across <br /> Sri Lanka
        </h1>
        <p className="text-white text-base font-medium">
          Discover the joy of travel across Sri Lanka with real-time bus seat
          booking and detailed route information at your fingertips.
        </p>
        <div className="py-8">
          <ReservationSearch />
        </div>

        {/* <button
          className="bg-blue-500 px-10 py-2 start-0 text-white text-sm font-semibold uppercase mt-10"
          //   onClick={() => handleNavigate("/track-trains")}
        >
          Book your seats
        </button> */}
      </div>
    </section>
  );
};

export default Hero;
