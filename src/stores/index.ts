// src/stores/index.ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";
import dateReducer from "./dateReducer";

const store = configureStore({
  reducer: {
    date: dateReducer,
    todos: todoReducer,
  },
});

// 스토어에서 사용할 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
