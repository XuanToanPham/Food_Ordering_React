import React, { useState } from "react";
import {
  MdShoppingBag,
  MdStar,
  MdShare,
  MdReport,
  MdCheck,
} from "react-icons/md";
import { motion } from "framer-motion";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";

const FoodDetailReview = ({ index, getDataSubmitComment }) => {
  const [{ user }, dispatch] = useStateValue();
  const [valueEmail, setValueEmail] = useState(user ? user.email : "");
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputRatingRef = useRef();
  const inputCommentRef = useRef();
  const [submit, setSubmit] = useState();
  const [foodDetail, setFoodDetail] = useState();
  const getFoodDetail = async () => {
    await axios
      .get(
        `https://restaurantapp-ffbfd-default-rtdb.firebaseio.com/comments/-NELb_YF5gfY_BdUEX2N/${index}.json`
      )
      .then((res) => {
        console.log(res.data);
        setFoodDetail(res.data);
      })
      .catch((err) => console.log(err));
  };
  const putDataUpdate = async (data) => {
    await axios
      .put(
        `https://restaurantapp-ffbfd-default-rtdb.firebaseio.com/comments/-NELb_YF5gfY_BdUEX2N/${index}.json`,
        data
      )
      .then((res) => {
        console.log(res);
        getFoodDetail();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFoodDetail();
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    const valueInputName = inputNameRef.current.value;
    const valueInputEmail = inputEmailRef.current.value;
    const valueInputRating = inputRatingRef.current.value;
    const valueInputComment = inputCommentRef.current.value;
    if (
      valueInputName &&
      valueInputEmail &&
      valueInputRating &&
      valueInputComment
    ) {
      const data = {
        id: Date.now(),
        name: valueInputName,
        email: valueInputEmail,
        Date: `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
          new Date()
        )}, ${new Date().getDate()}, ${new Date().getFullYear()}`,
        comment: valueInputComment,
        rating: +valueInputRating,
      };
      console.log(foodDetail.comments);
      if (foodDetail.comments) {
        const comments = [...foodDetail.comments, data];
        const rating = ((foodDetail.rate + +valueInputRating) / 2).toFixed(1);
        console.log(rating);
        const dataUpdate = {
          ...foodDetail,
          comments: comments,
          rate: +rating,
        };
        console.log("Co comment", dataUpdate);
        putDataUpdate(dataUpdate);
        getDataSubmitComment(dataUpdate);
      } else {
        const dataUpdate = {
          ...foodDetail,
          comments: [data],
          rate: +valueInputRating,
        };
        console.log("Khong co commnet", dataUpdate);
        putDataUpdate(dataUpdate);
        getDataSubmitComment(dataUpdate);
      }
      console.log(index);
      setFields(true);
      setAlertStatus("success");
      setMsg("Thanks for your review :333");
      setTimeout(() => {
        setFields(false);
        setAlertStatus("");
        setMsg("");
      }, 3000);
    } else {
      setFields(true);
      setAlertStatus("danger");
      setMsg("Please enter all fields.Thank you :333");
      setTimeout(() => {
        setFields(false);
        setAlertStatus("");
        setMsg("");
      }, 3000);
    }
  };
  return (
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    velit dolores mollitia molestiae necessitatibus accusamus,
                    alias a et atque? Explicabo?
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    velit dolores mollitia molestiae necessitatibus accusamus,
                    alias a et atque? Explicabo?
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    velit dolores mollitia molestiae necessitatibus accusamus,
                    alias a et atque? Explicabo?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] md:w-[40%] flex flex-col">
          <div className="flex flex-col w-full items-center justify-center">
            <form
              className="flex flex-col gap-5 w-full md:ml-20"
              action=""
              onSubmit={submitForm}
            >
              <p className="flex text-xl font-semibold">Write Your Review</p>
              <div className="w-full py-2 flex flex-col gap-2">
                <label
                  htmlFor="inputName"
                  className="text-md text-textColor cursor-pointer"
                >
                  Your name
                </label>
                <input
                  ref={inputNameRef}
                  id="inputName"
                  type="text"
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
                {user ? (
                  <input
                    id="emailInput"
                    type="email"
                    required
                    disabled
                    placeholder={user && valueEmail}
                    value={valueEmail}
                    ref={inputEmailRef}
                    className="outline-none w-full text-base border-b-2 cursor-not-allowed
                  border-gray-200 rounded-md p-2"
                  />
                ) : (
                  <input
                    ref={inputEmailRef}
                    id="emailInput"
                    type="email"
                    required
                    placeholder={"Your email ....   "}
                    className="outline-none w-full text-base border-b-2
                border-gray-200 rounded-md cursor-pointer p-2"
                  />
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="rating"
                  className="text-md text-textColor cursor-pointer"
                >
                  Choosen rating
                </label>
                <select
                  ref={inputRatingRef}
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
                  ref={inputCommentRef}
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
                className=" w-full rounded-md bg-orange-500 py-2 text-white font-semibold"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailReview;
