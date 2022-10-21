import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdStar } from "react-icons/md";
const FoodDetailRelated = ({ data, flag }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
    >
      <div
        className={`w-full my-12 flex items-center gap-3 bg-rowBg scroll-smooth scrollItem  ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap justify-center"
        }`}
      >
        {data?.map((item) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.75 }}
            className="w-275 h-[200px] md:w-300 min-w-[275px] md:min-w-[300px] my-12 shadow-md rounded-lg p-2 
      bg-cardOverlay backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-center"
          >
            <Link
              to={`/review/${item.id}`}
              className="w-full flex items-center justify-between"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-15 h-10
                flex justify-center items-center flex-col cursor-pointer hover:shadow-md"
              >
                <p className="flex justify-center text-center font-bold">
                  4.8 <MdStar className="text-yellow-500 text-2xl" />
                </p>
                <span className="text-textColor">(12 reviews)</span>
              </motion.div>
            </Link>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FoodDetailRelated;
