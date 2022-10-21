import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  MdShoppingBag,
  MdStar,
  MdShare,
  MdReport,
  MdCheck,
} from "react-icons/md";

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import FoodDetailDesc from "./FoodDetailDesc";
import FoodDetailReview from "./FoodDetailReview";
import RowContainer from "./RowContainer";
import FoodDetailRelated from "./FoodDetailRelated";
const FoodDetail = () => {
  const param = useParams();
  const [{ reviewFoods, cartItems, foodItems }, dispatch] = useStateValue();
  const [foodDetail, setFoodDetail] = useState();
  const [filter, setFilter] = useState("desc");
  const [errorQty, setErrorQty] = useState();
  const [qty, setQty] = useState(0);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [indexData, setIndexData] = useState();
  const qtyHandler = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setErrorQty("Quantity > 0");
    } else if (value === "") {
      setErrorQty(null);
      setQty(+0);
    } else {
      setQty(+value);
    }
  };
  const getFoodDetail = async () => {
    await axios
      .get(
        "https://restaurantapp-ffbfd-default-rtdb.firebaseio.com/comments/-NELb_YF5gfY_BdUEX2N.json"
      )
      .then((res) => {
        setFoodDetail(res.data.find((item) => item.id === param.id));
        setIndexData(res.data.findIndex((item) => item.id === param.id));
      })
      .catch((err) => console.log(err));
  };
  const addToCartItem = () => {
    let cartItemsLocal = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    if (qty > 0) {
      let item = [...cartItemsLocal];
      const index = cartItemsLocal.findIndex(
        (item) => item.id === foodDetail.id
      );
      console.log(index);
      if (index > -1) {
        console.log(item[index]);
        item[index].qty += qty;
      } else {
        item = [...cartItemsLocal, { ...foodDetail, qty: qty }];
      }
      notifi(true, "success", "Add to cart successfully");
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: item,
      });
      localStorage.setItem("cartItems", JSON.stringify(item));
    } else {
      notifi(true, "danger", "Enter Quantity > 0. Thank you :333");
    }
  };
  const notifi = (fields, alertStatus, msg) => {
    setFields(fields);
    setAlertStatus(alertStatus);
    setMsg(msg);
    setTimeout(() => {
      setFields(false);
      setAlertStatus("");
      setMsg("");
    }, 3000);
  };
  const [submitComment, setSubmitComment] = useState();
  const getDataSubmitComment = (data) =>{
    setSubmitComment(data);
  }
  console.log(submitComment);
  useEffect(() => {
    getFoodDetail();
  }, [reviewFoods, param.id, submitComment]);

  return (
    <section className="w-full my-6 flex flex-col gap-8">
      {fields && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-full p-2 rounded-lg text-center font-semibold ${
            alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
          }`}
        >
          {msg}
        </motion.p>
      )}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center justify-center lg:justify-start">
        <div className="flex items-center lg:justify-start justify-center">
          <div className="w-[430px] h-[380px]">
            <img
              src={foodDetail?.imageURL}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center lg:justify-start gap-6 mt-4 flex-1">
          <motion.p
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            className="text-3xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
          duration-100 lg:mr-auto"
          >
            {foodDetail?.title}
          </motion.p>

          <div className="w-full flex items-center justify-center lg:justify-start gap-8">
            <div className="py-2 px-4 rounded-md bg-orange-400 text-white flex items-center gap-1 text-lg font-bold ">
              <MdStar className="text-xl" />
              4.6
            </div>

            <div className="text-textColor text-lg">500 Add to Cart</div>
            <div className="text-textColor text-lg">3.1k Food Watched</div>
          </div>
          <div className="text-textColor text-base text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            commodi repellat minus obcaecati impedit magnam autem totam,
            accusantium dignissimos facere!
          </div>

          <div className="w-full flex justify-center lg:justify-start gap-8">
            <div className="flex flex-col items-center gap-2">
              <label className="text-gray-600 font-bold ml-[55px] w-full">
                Quantity
              </label>
              <div className="w-[50%] py-2 border relative border-gray-300 rounded-md px-2 flex flex-col items-center gap-2 mr-auto">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full h-full text-lg bg-transparent font-semibold
            outline-none border-none placeholder:text-gray-400 text-textColor"
                  onChange={qtyHandler}
                />
                {errorQty && (
                  <div className="absolute -bottom-[25px] text-red-400 w-full">
                    {errorQty}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-gray-600 font-bold w-full">Price</div>
              <div className="text-gray-600 text-lg font-medium flex justify-center w-full">
                {parseFloat(+qty * +foodDetail?.price).toFixed(2)} $
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-full flex items-center bg-orange-400 justify-center gap-3 py-2
        hover:bg-orange-600 text-white font-bold px-4 rounded-xl transition-all duration-100 ease-in-out"
            onClick={addToCartItem}
          >
            Add to Cart <MdShoppingBag className="text-xl" />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row justify-between gap-6 md:gap-0">
        <div>
          <ul className="flex items-center justify-center gap-9">
            <li
              className={`text-base font-medium ${
                filter && filter === "desc"
                  ? "text-headingColor"
                  : " text-textColor"
              } cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out`}
              onClick={() => setFilter("desc")}
            >
              Descriptions
            </li>
            <li
              className={`text-base font-medium ${
                filter && filter === "review"
                  ? "text-headingColor"
                  : " text-textColor"
              } cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out`}
              onClick={() => setFilter("review")}
            >
              Review ( 2.1k ){" "}
            </li>
            <li
              className={`text-base font-medium ${
                filter && filter === "related"
                  ? "text-headingColor"
                  : " text-textColor"
              } text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out`}
              onClick={() => setFilter("related")}
            >
              Related Product
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex items-center justify-center gap-9">
            <li className="text-base font-medium text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              <MdReport className="inline" /> Report Food{" "}
            </li>
            <li className="text-base font-medium text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              <MdShare className="inline" /> Share
            </li>
          </ul>
        </div>
      </div>
      {filter === "desc" && <FoodDetailDesc foodDetail={foodDetail} />}
      {filter === "review" && <FoodDetailReview foodDetail={foodDetail} index={indexData} getDataSubmitComment ={getDataSubmitComment} />}
      {filter === "related" && (
        <FoodDetailRelated
          flag={false}
          data={foodItems?.filter((n) => n.category === foodDetail.category)}
        />
      )}
    </section>
  );
};

export default FoodDetail;
