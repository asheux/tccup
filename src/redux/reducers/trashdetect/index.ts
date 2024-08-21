import initState from "../initState";
import { createAppSlice } from "../slice";

export const trashDetectSlice = createAppSlice(
  "trashdetect",
  initState.payload.trashdetect,
);

export default trashDetectSlice.reducer;
