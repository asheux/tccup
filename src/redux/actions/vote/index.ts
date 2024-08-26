import { saveVote } from "./vote.api";
import { saveVoteSlice } from "src/redux/reducers/vote";

export const saveVoteAction = (thoughtId, vote, endpoint) => (dispatch) => {
  const { request, failure, success } = saveVoteSlice.actions;

  dispatch(request());
  return saveVote(thoughtId, vote, endpoint)
    .then((res) => {
      if (res?.error) {
        return dispatch(failure(res?.error));
      } else if (res?.data) {
        return dispatch(success(res.data));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
