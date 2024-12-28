import { aboutUs } from "../../constants";

const AboutUs = () => {
  return (
    <div className="w-full px-40 py-10 bg-[#100824]">
      <h1 className="text-center text-white text-3xl font-semibold uppercase">
        About Us
      </h1>
      {aboutUs.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-center gap-16 mt-10"
        >
          <div className="space-y-3 w-[400px]">
            <p className="text-sm text-justify text-white font-medium">
              {item.topic1}
            </p>
            <p className="text-sm text-justify text-white font-medium">
              {item.topic2}
            </p>
          </div>
          <div className="space-y-3 w-[400px]">
            <p className="text-sm text-justify text-white font-medium">
              {item.topic3}
            </p>
            <p className="text-sm text-justify text-white font-medium">
              {item.topic4}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
