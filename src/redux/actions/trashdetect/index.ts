import { trashDetect } from "./trashdetect.api";
import { trashDetectSlice } from "src/redux/reducers/trashdetect";

export const trashDetectAction = (file) => (dispatch) => {
  const { request, failure, success } = trashDetectSlice.actions;
  dispatch(request());
  return trashDetect(file)
    .then((res) => {
      if (res?.error) {
        return dispatch(failure(res));
      } else if (res?.data) {
        return dispatch(success(res));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
