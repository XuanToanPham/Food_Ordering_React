import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { fireStore } from "../firebase.config";
//Saving new item

export const saveItem = async (data) => {
  await setDoc(doc(fireStore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

//Get All food Items

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(fireStore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
