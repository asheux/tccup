import { combineReducers } from "redux";

import saveThoughtReducer from "./thought";
import getThoughtsReducer from "./thoughts";
import saveVoteReducer from "./vote";
import uploadFileReducer from "./upload";
import trashDetectReducer from "./trashdetect";
import addToBlockchainReducer from "./blockchain";
import getBlocksReducer from "./blocks";

const rootReducer = combineReducers({
  thought: saveThoughtReducer,
  thoughts: getThoughtsReducer,
  vote: saveVoteReducer,
  upload: uploadFileReducer,
  trashdetect: trashDetectReducer,
  blockchain: addToBlockchainReducer,
  blocks: getBlocksReducer,
});

export default rootReducer;
