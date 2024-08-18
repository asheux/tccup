import { combineReducers } from "redux";

import saveThoughtReducer from "./thought";
import getThoughtsReducer from "./thoughts";
import saveVoteReducer from "./vote";

const rootReducer = combineReducers({
  thought: saveThoughtReducer,
  thoughts: getThoughtsReducer,
  vote: saveVoteReducer,
});

export default rootReducer;
