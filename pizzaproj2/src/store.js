import { createStore } from "redux";
import rootReducer from "./redux/index.js";
const store = createStore(rootReducer);
export default store;