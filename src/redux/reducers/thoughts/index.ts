import initState from "../initState";
import { createAppSlice } from "../slice";

export const getThoughtsSlice = createAppSlice(
  "thoughts",
  initState.payload.thoughts,
);

export default getThoughtsSlice.reducer;
