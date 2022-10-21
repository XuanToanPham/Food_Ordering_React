import React from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      console.log(user);
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header className="bg-primary fixed z-50 w-screen p-3 px-4 md:p-4 md:px-16">
      {/* desktop tablet */}
      <div className="hidden md:flex w-full h-full text-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              onClick={() => setIsMenu(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              onClick={() => setIsMenu(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
            >
              <Link to={"/menu"}>Menu</Link>
            </li>
            <li
              onClick={() => setIsMenu(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
            >
              <Link to={"/review"}>Review </Link>
            </li>
            <li
              onClick={() => setIsMenu(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
            >
              Find a C-City
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              onClick={login}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer bor rounded-full"
              alt="userProfile"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
              >
                {user && user.email === "phamxuantoan2710@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200
               transition-all duration-100 ease-in-out text-textColor text-base justify-between"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200
               transition-all duration-100 ease-in-out text-textColor text-base justify-between"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="flex md:hidden w-full h-ful items-center justify-between">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer bor rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
            >
              {user && user.email === "phamxuantoan2710@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200
               transition-all duration-100 ease-in-out text-textColor text-base justify-between"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor cursor-pointer hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out"
                >
                  Home
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor cursor-pointer hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out"
                >
                  Menu
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor cursor-pointer hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out"
                >
                  About Us
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor cursor-pointer hover:bg-slate-100 px-4 py-2 duration-100 transition-all ease-in-out"
                >
                  Service
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md bg-gray-200 flex items-center gap-3 cursor-pointer hover:bg-gray-300
               transition-all duration-100 ease-in-out text-textColor text-base justify-center"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
