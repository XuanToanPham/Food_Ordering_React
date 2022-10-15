import React from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { useRef } from "react";
import { useState } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import { useEffect } from "react";
const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scroll, setScroll] = useState(0);
  const [maxWidthRowContainer, setMaxWidthRowContainer] = useState();
  const getMaxWidthRowContainer = (width) => {
    setMaxWidthRowContainer(width);
  };
  const scrollPrev = () => {
    if (scroll > 0) {
      setScroll(scroll - 200);
    } else {
      setScroll(0);
    }
  };
  const scrollNext = () => {
    if (scroll < maxWidthRowContainer) {
      setScroll(scroll + 200);
    } else {
      setScroll(maxWidthRowContainer);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
          duration-100"
          >
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={scrollPrev}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            flex items-center justify-center transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={scrollNext}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          getMaxWidthRowContainer={getMaxWidthRowContainer}
          scrollValue={scroll}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>
      <MenuContainer />

      
    </div>
  );
};

export default MainContainer;
