// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userApi from "./userApi";
import userReducer from "./userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import taskApiSlice from "./tasksApi";
import tasksReducer from "./tasksSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApiSlice.reducerPath]: taskApiSlice.reducer,
    user: userReducer,
    tasks: tasksReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApiSlice.middleware),
});

export default store;
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
