import initState from "../initState";
import { createAppSlice } from "../slice";

export const uploadFileSlice = createAppSlice(
  "upload",
  initState.payload.upload,
);

export default uploadFileSlice.reducer;
