import React from "react";
import { useStateValue } from "../context/StateProvider";
import { MdFastfood, MdSearch, MdStar } from "react-icons/md";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useRef, useState } from "react";
import { useEffect } from "react";
import notFound from "../img/NotFound.svg";
import axios from "axios";
import { actionType } from "../context/reducer";
import { Link } from "react-router-dom";
const ReviewContainer = () => {
  const [{ reviewFoods }, dispatch] = useStateValue();
  const [dataRender, setDataRender] = useState();
  const [fullData, setFullData] = useState();

  const getReviewsFood = async () => {
    await axios
      .get(
        "https://restaurantapp-ffbfd-default-rtdb.firebaseio.com/comments/-NELb_YF5gfY_BdUEX2N.json"
      )
      .then((res) => {
        setDataRender(res.data);
        setFullData(res.data);
        dispatch({
          type: actionType.SET_REVIEWFOODS,
          reviewFoods: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
  const flag = false;
  useEffect(() => {
    getReviewsFood();
  }, []);
  const searchHandler = (e) => {
    console.log(e.target.value.toLowerCase());
    const valueSearch = e.target.value.toLowerCase();
    const testData = dataRender.filter((item) =>
      item.title.toLowerCase().includes(valueSearch)
    );
    setDataRender(testData);
    if (valueSearch === "") {
      setDataRender(fullData);
    }
  };
  console.log(dataRender);
  return (
    <section className="w-full my-6" id="menu">
     
      <div className="w-full flex items-center justify-between">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative
        before:absolute before:rounded-lg before:content before:w-20 before:h-1
        before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
        duration-100 mr-auto"
        >
          Customer Reviews
        </p>

        <div className="w-350 py-2 border-b border-gray-300 flex items-center gap-2">
          <MdSearch className="text-xl text-gray-700" />
          <input
            type="text"
            required
            placeholder="Search food ... "
            className="w-full h-full text-lg bg-transparent font-semibold
            outline-none border-none placeholder:text-gray-400 text-textColor"
            onChange={searchHandler}
          />
        </div>
      </div>
      <div
        className={`w-full my-12 flex items-center gap-3 bg-rowBg scroll-smooth scrollItem  ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap justify-center"
        }`}
      >
        {dataRender && dataRender.length > 0 ? (
          dataRender.map((item) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={item.id}
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
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src={notFound} alt="" className="h-340" />
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewContainer;
