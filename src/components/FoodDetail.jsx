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
const FoodDetail = () => {
  const param = useParams();
  const [{ reviewFoods, cartItems }, dispatch] = useStateValue();
  const [foodDetail, setFoodDetail] = useState();
  const [filter, setFilter] = useState("desc");
  const [errorQty, setErrorQty] = useState();
  const [qty, setQty] = useState(0);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
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
      .then((res) =>
        setFoodDetail(res.data.find((item) => item.id === param.id))
      )
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
  useEffect(() => {
    getFoodDetail();
  }, [reviewFoods]);

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
          <p
            className="text-3xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out
          duration-100 lg:mr-auto"
          >
            {foodDetail?.title}
          </p>

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

      <div className="flex items-center justify-between">
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
                filter && filter === "replated"
                  ? "text-headingColor"
                  : " text-textColor"
              } text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out`}
              onClick={() => setFilter("replated")}
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
      <FoodDetailDesc foodDetail={foodDetail} />
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold">Review</div>
        <div className="flex flex-col lg:flex-row items-center gap-4 pb-6 border-b-2">
          <div className="flex flex-col gap-3">
            <p className="text-base text-textColor">for {foodDetail?.title}</p>
            <div className="flex items-center gap-2">
              <MdStar className="text-yellow-400 text-3xl" />
              <p className="text-5xl ">4,6</p>
              <p className="text-3xl">/5.0</p>
            </div>
            <div className="flex flex-col mt-4 px-4 py-2 bg-slate-300 rounded-md">
              <p>Recommended</p>
              <span className="text-textColor ">
                (88%) Buyer recommended this food
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex w-[70%] flex-col gap-4 ml-4"
          >
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="mb-1 text-base font-medium text-textColor flex items-center gap-1">
                <p className="text-xl">5</p>{" "}
                <MdStar className="text-yellow-400 text-xl" />
              </div>
              <div className="w-full rounded-full h-1.5 mb-1 bg-gray-300 flex items-center">
                <div className="bg-green-400 h-1.5 rounded-full w-[75%]"></div>
              </div>
              <div className="ml-3 text-textColor">1,5k</div>
            </div>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="mb-1 text-base font-medium text-textColor flex items-center gap-1">
                <p className="text-xl">4</p>{" "}
                <MdStar className="text-yellow-400 text-xl" />
              </div>
              <div className="w-full rounded-full h-1.5 mb-1 bg-gray-300 flex items-center">
                <div className="bg-green-400 h-1.5 rounded-full w-[55%]"></div>
              </div>
              <div className="ml-3 text-textColor">1,5k</div>
            </div>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="mb-1 text-base font-medium text-textColor flex items-center gap-1">
                <p className="text-xl">3</p>{" "}
                <MdStar className="text-yellow-400 text-xl" />
              </div>
              <div className="w-full rounded-full h-1.5 mb-1 bg-gray-300 flex items-center">
                <div className="bg-green-400 h-1.5 rounded-full w-[35%]"></div>
              </div>
              <div className="ml-3 text-textColor">1,5k</div>
            </div>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="mb-1 text-base font-medium text-textColor flex items-center gap-1">
                <p className="text-xl">2</p>{" "}
                <MdStar className="text-yellow-400 text-xl" />
              </div>
              <div className="w-full rounded-full h-1.5 mb-1 bg-gray-300 flex items-center">
                <div className="bg-green-400 h-1.5 rounded-full w-[25%]"></div>
              </div>
              <div className="ml-3 text-textColor">1,5k</div>
            </div>
            <div className="flex w-full items-center gap-2 justify-center">
              <div className="mb-1 text-base font-medium text-textColor flex items-center gap-1">
                <p className="text-xl">1</p>{" "}
                <MdStar className="text-yellow-400 text-xl" />
              </div>
              <div className="w-full rounded-full h-1.5 mb-1 bg-gray-300 flex items-center">
                <div className="bg-green-400 h-1.5 rounded-full w-[5%]"></div>
              </div>
              <div className="ml-3 text-textColor">1,5k</div>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start mt-2">
          <div className="w-[100%] md:w-[60%] flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-800 text-xl font-semibold">
                  All Comments (2,1k)
                </p>
                <div className="flex items-center gap-2">
                  <div>Sort by : </div>

                  <div className="inline-flex bg-white border rounded-md">
                    <div className="cursor-pointer px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
                      Option
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <div className="hidden absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                        <ul className="p-2">
                          <li className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                            Newest
                          </li>
                          <li className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                            All
                          </li>
                          <li className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                            Positive
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-[400px] mt-4 gap-4 overflow-y-scroll">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src="https://lh3.googleusercontent.com/a-/ACNPEu9KWFmG5DgeiUXPhDy40WBBakxKQcldmLNx0Et9KA=s96-c"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Pham Xuan Toan</p>
                        <p className="text-md text-textColor">July, 23, 2022</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                      </div>

                      <div className="text-sm text-textColor">
                        83% of users found this review helpful
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <AiOutlineLike className="text-xl" />
                      <AiOutlineDislike className="text-xl" />
                    </div>
                  </div>
                  <div className="flex">
                    <p className="text-textColor">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam velit dolores mollitia molestiae necessitatibus
                      accusamus, alias a et atque? Explicabo?
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src="https://lh3.googleusercontent.com/a-/ACNPEu9KWFmG5DgeiUXPhDy40WBBakxKQcldmLNx0Et9KA=s96-c"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Pham Xuan Toan</p>
                        <p className="text-md text-textColor">July, 23, 2022</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                      </div>

                      <div className="text-sm text-textColor">
                        83% of users found this review helpful
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <AiOutlineLike className="text-xl" />
                      <AiOutlineDislike className="text-xl" />
                    </div>
                  </div>
                  <div className="flex">
                    <p className="text-textColor">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam velit dolores mollitia molestiae necessitatibus
                      accusamus, alias a et atque? Explicabo?
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src="https://lh3.googleusercontent.com/a-/ACNPEu9KWFmG5DgeiUXPhDy40WBBakxKQcldmLNx0Et9KA=s96-c"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Pham Xuan Toan</p>
                        <p className="text-md text-textColor">July, 23, 2022</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex gap-1">
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                        <MdStar className="text-lg text-yellow-400" />
                      </div>

                      <div className="text-sm text-textColor">
                        83% of users found this review helpful
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <AiOutlineLike className="text-xl" />
                      <AiOutlineDislike className="text-xl" />
                    </div>
                  </div>
                  <div className="flex">
                    <p className="text-textColor">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam velit dolores mollitia molestiae necessitatibus
                      accusamus, alias a et atque? Explicabo?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] md:w-[40%] flex flex-col">
            <div className="flex flex-col w-full items-center justify-center">
              <form className="flex flex-col gap-5 w-full md:ml-20" action="">
                <caption className="flex text-xl font-semibold">
                  Write Your Review
                </caption>
                <div className="w-full py-2 flex flex-col gap-2">
                  <label
                    htmlFor="inputName"
                    className="text-md text-textColor cursor-pointer"
                  >
                    Your name
                  </label>
                  <input
                    id="inputName"
                    type="text"
                    required
                    placeholder="Your Name..."
                    className="outline-none w-full text-base border-b-2
                  border-gray-200 rounded-md cursor-pointer p-2"
                  />
                </div>
                <div className="w-full py-2 flex flex-col gap-2">
                  <label
                    htmlFor="emailInput"
                    className="text-md text-textColor cursor-pointer"
                  >
                    Your Email
                  </label>

                  <input
                    id="emailInput"
                    type="email"
                    required
                    placeholder="Yourmail@gmail.com"
                    className="outline-none w-full text-base border-b-2
                  border-gray-200 rounded-md cursor-pointer p-2"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="rating"
                    className="text-md text-textColor cursor-pointer"
                  >
                    Choosen rating
                  </label>
                  <select
                    id="rating"
                    className="outline-none w-full text-base border-b-2
                  border-gray-200 rounded-md cursor-pointer p-2"
                  >
                    <option
                      value="other"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      Select Category
                    </option>
                    <option
                      value="1"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      1
                    </option>
                    <option
                      value="2"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      2
                    </option>
                    <option
                      value="3"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      3
                    </option>
                    <option
                      value="4"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      4
                    </option>
                    <option
                      value="5"
                      className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    >
                      5
                    </option>
                  </select>
                </div>
                <div className="w-full py-2 flex flex-col gap-2">
                  <label
                    htmlFor="emailInput"
                    className="text-md text-textColor cursor-pointer"
                  >
                    Your Comment
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows={"5"}
                    placeholder="Your comment ... "
                    className="outline-none w-full text-base border-b-2
                  border-gray-200 rounded-md cursor-pointer p-2"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className=" w-full rounded-md bg-blue-400 py-2 text-white font-semibold"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetail;
