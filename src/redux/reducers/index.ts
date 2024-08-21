import { combineReducers } from "redux";

import saveThoughtReducer from "./thought";
import getThoughtsReducer from "./thoughts";
import saveVoteReducer from "./vote";
import uploadFileReducer from "./upload";
import trashDetectReducer from "./trashdetect";

const rootReducer = combineReducers({
  thought: saveThoughtReducer,
  thoughts: getThoughtsReducer,
  vote: saveVoteReducer,
  upload: uploadFileReducer,
  trashdetect: trashDetectReducer,
});

export default rootReducer;
