import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";
import CartItem from "./CartItem";
const CartContainer = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const closeCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  const clearCartItem = () =>{
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    })
    localStorage.removeItem("cartItems");
  }

  const delivery = 2.5;
  const subTotal = cartItems.reduce((pre, next) => {
    return parseFloat((pre + (next.price * next.qty)).toFixed(2)); 
  }, 0);
  const total = parseFloat(+subTotal + delivery);
  console.log(subTotal);
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md 
    flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={closeCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCartItem}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
          hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        <div
          className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
        scrollbar-none"
        >
          {cartItems &&
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} itemQty={item.qty}/>
            ))}
          {/* Cart item */}
        </div>
        <div
          className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col
        items-center justify-evenly px-8 py-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">${subTotal}</p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">${delivery}</p>
          </div>

          <div className="w-full border-b border-gray-600 my-2"></div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 text-xl font-semibold">Total</p>
            <p className="text-gray-200 text-xl font-semibold">${total}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full p-2 rounded-full bg-yellow-500 text-gray-50 text-lg my-2
            hover:shadow-lg transition-all duration-150 ease-out"
          >
            Check Out
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartContainer;
