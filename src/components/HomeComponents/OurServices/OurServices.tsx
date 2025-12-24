import Image from "next/image";
import { ourServices } from "@/data/home_data";

const OurServices = () => {
  return (
    <>
      {ourServices.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-center text-center sm:w-full sm:flex-col"
        >
          <div className="flex flex-col items-center">
            <div className="align-center mx-auto mb-[16px] flex h-[40px] min-h-[px] w-[67px] min-w-[40px] justify-center rounded-[5px] sm:mb-[16px]">
              <Image
                src={service.image}
                width={67}
                height={67}
                alt="Services"
                className="select-none"
              />
            </div>
            <div className="font-14px-ALL mb-[2px] font-bold">
              {service.name}
            </div>
            <div className="font-13px-ALL font-normal">
              {service.description}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OurServices;
