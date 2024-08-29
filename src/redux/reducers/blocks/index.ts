import initState from "../initState";
import { createAppSlice } from "../slice";

export const getBlocksSlice = createAppSlice(
  "blocks",
  initState.payload.blocks,
);

export default getBlocksSlice.reducer;
