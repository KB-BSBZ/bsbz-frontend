import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
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
});

export const productIdState = atom({
  key: "productId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// export const leftRoyalsState = atom({
//   key: "leftRoyals",
//   default: 0,
//   effects_UNSTABLE: [persistAtom],
// });

// export const prductCostState = atom({
//   key: "prductCost",
//   default: 0,
//   effects_UNSTABLE: [persistAtom],
// });
