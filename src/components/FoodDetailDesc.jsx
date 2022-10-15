import React from "react";
import { MdCheck } from "react-icons/md";
const FoodDetailDesc = ({ foodDetail }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-[100%] lg:w-[75%] text-textColor flex text-center lg:text-left justify-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
        blanditiis optio fugit nobis iure accusamus fuga reiciendis, minima
        consectetur voluptas pariatur omnis architecto qui unde sapiente!
        Quisquam corporis praesentium velit?
      </div>
      <div className="w-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              Overview
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-between py-2 px-4 bg-gray-300 rounded-md">
                <span className="text-lg font-normal text-textColor">
                  Brand
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  Chicken City
                </p>
              </li>
              <li className="flex items-center justify-between  py-2 px-4">
                <span className="text-lg font-normal text-textColor ">
                  Ingredient
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  Chicken and Rice
                </p>
              </li>
              <li className="flex items-center justify-between py-2 px-4 bg-gray-300 rounded-md">
                <span className="text-lg font-normal text-textColor ">
                  Time
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  45minute
                </p>
              </li>
              <li className="flex items-center justify-between py-2 px-4">
                <span className="text-lg font-normal text-textColor ">
                  Calories
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  {foodDetail?.calories} Calories
                </p>
              </li>
              <li className="flex items-center justify-between py-2 px-4 bg-gray-300 rounded-md">
                <span className="text-lg font-normal text-textColor ">
                  Demo
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  This is content DEMO
                </p>
              </li>
              <li className="flex items-center justify-between py-2 px-4">
                <span className="text-lg font-normal text-textColor ">
                  Demo
                </span>{" "}
                <p className="flex-1 flex items-center justify-center">
                  This is content DEMO
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              What's inside Food
            </div>
            <div className="grid grid-cols-2 justify-center">
              <div className="flex flex-col items-center">
                <ul className="flex flex-col gap-10">
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">Vitamin A </p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">Vitamin B</p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">Vitamin B1</p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">
                      Low quality function
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">Fresh chicken</p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <ul className="flex flex-col gap-10">
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">No Preservatives</p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white rounded-md bg-gray-400 text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">
                      Use natural food coloring
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">
                      This is content Demo
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span>
                      <MdCheck className="text-white bg-gray-400 rounded-md text-xl px-1 py-1" />
                    </span>
                    <p className="text-base text-gray-800">
                      This is content Demo
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailDesc;
