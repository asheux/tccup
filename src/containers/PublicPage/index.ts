import { connect } from "react-redux";

import PublicPage from "src/components/PublicPage";
import { saveThoughtAction } from "src/redux/actions/thought";
import { getThoughtsAction } from "src/redux/actions/thoughts";
import { saveVoteAction } from "src/redux/actions/vote";
import { uploadFileAction } from "src/redux/actions/upload";
import { trashDetectAction } from "src/redux/actions/trashdetect";
import { addToBlockchainAction } from "src/redux/actions/blockchain";

/**
 * map state to props or updates the
 * component with infomation from the store
 * using the action creators
 *  @param {*} object
 */
const mapStateToProps = (state) => ({
  thought: state.thought,
  thoughts: state.thoughts,
  vote: state.vote,
  upload: state.upload,
  trashdetect: state.trashdetect,
});

export default connect(mapStateToProps, {
  saveThoughtAction,
  getThoughtsAction,
  saveVoteAction,
  uploadFileAction,
  trashDetectAction,
  addToBlockchainAction,
})(PublicPage);
