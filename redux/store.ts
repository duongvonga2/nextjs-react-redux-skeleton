import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth/auth.reducer";
import thunk from "redux-thunk";
import discussionReducer from "./discussion/discussion.reducer";
import categoryReducer from "./category/category.reducer";
import commentReducer from "./comment/comment.reducer";
import userReducer from "./user/user.reducer";
import tagReducer from "./tag/tag.reducer";
import pageReducer from "./page/page.reducer";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  auth: authReducer,
  discussion: discussionReducer,
  category: categoryReducer,
  comment: commentReducer,
  user: userReducer,
  tag: tagReducer,
  page: pageReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export default store;
