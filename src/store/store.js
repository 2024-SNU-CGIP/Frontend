import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";
import modelReducer from "./slices/modelSlice";

const store = configureStore({
  reducer: {
    image: imageReducer,
    model: modelReducer,
  },
});

export default store;
