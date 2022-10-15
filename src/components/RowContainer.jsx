import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useRef, useState } from "react";
import { useEffect } from "react";
import notFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const RowContainer = ({ flag, data, scrollValue, getMaxWidthRowContainer }) => {
  const rowContainerRef = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addCartItem = (item) => {
    const index = items.indexOf(item);
    let arrayItem = items
    if (arrayItem.indexOf(item) > -1) {
      const arrayUpdateItems = [...cartItems, item];
      console.log(arrayUpdateItems);
      const newArray = arrayUpdateItems.reduce((unique, itemCart) =>{
        if(unique.includes(itemCart)){
          console.log(itemCart);
          console.log(unique);
          const index = unique.indexOf(itemCart);
          unique[index].qty += 1;
          console.log(unique)
          return unique;
        }
        else{
          return [...unique, itemCart];
        }
      },[])
      setItems(newArray);
    }
    else{
      setItems([...cartItems, item]);
    }
  };
  useEffect(() => {
    const scrollWidth = document.querySelector(".scrollItem").scrollWidth;
    const widthRowContainer = document.querySelector(".scrollItem").clientWidth;
    if (getMaxWidthRowContainer) {
      getMaxWidthRowContainer(scrollWidth - widthRowContainer);
    }
    rowContainerRef.current.scrollLeft = scrollValue;
  }, [scrollValue, getMaxWidthRowContainer]);
  useEffect(() => {
    addToCart();
  }, [items]);
  return (
    <div
      ref={rowContainerRef}
      className={`w-full my-12 flex items-center gap-3 bg-rowBg scroll-smooth scrollItem  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 h-[200px] md:w-300 min-w-[275px] md:min-w-[300px] my-12 shadow-md rounded-lg p-2 
      bg-cardOverlay backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-center"
          >
            <div className="w-full flex items-center justify-between">
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
                className="w-10 h-10 rounded-full
                bg-red-600 flex justify-center items-center cursor-pointer hover:shadow-md"
                onClick={() => addCartItem(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
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
          </div>
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
  );
};

export default RowContainer;
