import { services } from "../../constants";

const OurServices = () => {
  return (
    <div className="w-full flex px-28 py-20">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl text-black font-bold uppercase mb-8 text-center">
          Our Services
        </h1>
        <div className="flex gap-8 flex-wrap">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-5 border-2 border-slate-700 bg-slate-900 rounded-sm w-[300px] space-y-4 hover:border-blue-400"
            >
              <p className="text-base text-white font-semibold">
                {service.route}
              </p>
              <p className="text-sm text-white font-medium">{service.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
