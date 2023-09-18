import { atom } from "recoil";

// Login 유무, 초깃값 false
export const loginState = atom({
  key: "isLogin",
  default: false,
  //   default: localStorage.getItem("isLoggedIn") === "true", // localStorage에서 상태를 가져옴
});

export const userNameState = atom({
  key: "userName",
  default: "",
});

export const userIdState = atom({
  key: "userId",
  default: "",
});

export const popupState = atom({
  key: "popup",
  default: false,
})