import { getBlocks } from "./blocks.api";
import { getBlocksSlice } from "src/redux/reducers/blocks";

export const getBlocksAction = (projectName) => (dispatch) => {
  const { request, failure, success } = getBlocksSlice.actions;

  dispatch(request());
  return getBlocks(projectName)
    .then((res) => {
      if (res?.data) {
        return dispatch(success(res.data));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
