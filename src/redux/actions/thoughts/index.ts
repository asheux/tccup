import { getThoughts } from "./thoughts.api";
import { getThoughtsSlice } from "src/redux/reducers/thoughts";

export const getThoughtsAction = () => (dispatch) => {
  const { request, failure, success } = getThoughtsSlice.actions;

  dispatch(request());
  return getThoughts()
    .then((res) => {
      if (res?.data) {
        return dispatch(success(res.data));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
