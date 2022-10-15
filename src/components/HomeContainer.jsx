import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
const HomeContainer = () => {

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div
          className="flex items-center justify-center bg-orange-100
        px-2 py-1 rounded-full"
        >
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.25rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            You City
          </span>
        </p>
        <p className="text-textColor text-base text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
          aliquid voluptatem cumque sapiente rem impedit, ipsum optio laborum
          dolorem perferendis dolor quas atque est harum non quo quia?
          Temporibus, iure!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto
          px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          alt="hero-bg"
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
        />
        <div className="w-full h-full absolute top-0 left-0 
        flex items-center justify-center py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl  
                flex flex-col items-center justify-center drop-shadow-lg"
                key={item.id}
              >
                <img
                  src={item.imageSrc}
                  alt="I1"
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                />
                <p className="text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor">
                  {item.name}
                </p>
                <p className=" text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {item.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-500">$</span> {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
