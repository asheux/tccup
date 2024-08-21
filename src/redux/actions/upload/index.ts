import { uploadFile } from "./upload.api";
import { uploadFileSlice } from "src/redux/reducers/upload";

export const uploadFileAction = (setPM, setP, file) => (dispatch) => {
  const { request, failure, success } = uploadFileSlice.actions;
  dispatch(request());
  return uploadFile(setPM, setP, file)
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
