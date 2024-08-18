import { saveThought } from "./thought.api";
import { saveThoughtSlice } from "src/redux/reducers/thought";

export const saveThoughtAction = (data) => (dispatch) => {
  const { request, failure, success } = saveThoughtSlice.actions;
  dispatch(request());
  return saveThought(data)
    .then((res) => {
      if (res?.errors) {
        return dispatch(failure(res?.errors));
      } else if (res?.data) {
        return dispatch(success(res.data));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
