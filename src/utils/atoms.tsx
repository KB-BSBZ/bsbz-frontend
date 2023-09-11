import { atom } from "recoil";

// Login 유무, 초깃값 false
export const loginState = atom({
  key: "isLogin",
  default: false,
  //   default: localStorage.getItem("isLoggedIn") === "true", // localStorage에서 상태를 가져옴
});
