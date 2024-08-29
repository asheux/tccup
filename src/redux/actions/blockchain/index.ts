import { addToBlockchain } from "./blockchain.api";
import { addToBlockchainSlice } from "src/redux/reducers/blockchain";

export const addToBlockchainAction =
  (file, blob, projectName) => (dispatch) => {
    const { request, failure, success } = addToBlockchainSlice.actions;
    dispatch(request());
    return addToBlockchain(file, blob, projectName)
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
