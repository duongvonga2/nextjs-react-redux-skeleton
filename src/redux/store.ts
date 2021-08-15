import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth/auth.reducer";
import thunk from "redux-thunk";
import userReducer from "./user/user.reducer";
import pageReducer from "./page/page.reducer";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  page: pageReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export default store;
