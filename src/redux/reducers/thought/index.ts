import initState from "../initState";
import { createAppSlice } from "../slice";

export const saveThoughtSlice = createAppSlice(
  "thought",
  initState.payload.thought,
);

export default saveThoughtSlice.reducer;
