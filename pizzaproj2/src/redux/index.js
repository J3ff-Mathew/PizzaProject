import { combineReducers } from "redux";
import cartCount from "./reducer";
const rootReducer = combineReducers({ cartCount });
export default rootReducer;