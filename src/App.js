import logo from "./logo.svg";
import "./App.css";
import { FoodDetail, Header, PageMenuContainer, ReviewContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";
import { CartContainer } from "./components";
function App() {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full bg-primary">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<PageMenuContainer />} />
            <Route path="/review" element = {<ReviewContainer/>}/>
            <Route path="/review/:id" element = {<FoodDetail/>}/>
          </Routes>
          {cartShow && <CartContainer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
