import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "./auth/loginUserSlice";
import renderTriggerReducer from "./renderTrigger";
import updateProjectReducer from "./project/updateProjectSlice";

export const store = configureStore({
  reducer: {
    loginUser: loginUserReducer,
    trigger: renderTriggerReducer,
    updateProject: updateProjectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
