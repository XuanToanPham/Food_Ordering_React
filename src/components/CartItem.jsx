import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const CartItem = ({ item, itemQty }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setQty(item.qty);
  }, [item.qty])
  const updateQty = (action, id, item) => {
    let qtyUpdate = qty;
    if (action === "add") {
      qtyUpdate += 1;
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
      });
      cartDispatch();
    } else {
      qtyUpdate -=1;
      setQty(qty - 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty -= 1;
        }
      });

      if (qtyUpdate == 0) {
        console.log(item);
        const index = cartItems.indexOf(item);
        console.log(index);
        cartItems.splice(index, 1);
      }
      cartDispatch();
    }
  };

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  useEffect(() => {
    setItems(cartItems);
  }, [qty, cartItems]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <div className="w-20 h-20 max-w-[60px]">
        <img
          src={item.imageURL}
          alt=""
          className="w-full h-full rounded-full object-contain"
        />
      </div>

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ${(parseFloat(item?.price) * qty).toFixed(2)}
        </p>
      </div>
      {/* button section */}

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item.id, item)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item.id, item)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
