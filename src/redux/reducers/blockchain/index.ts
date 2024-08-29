import initState from "../initState";
import { createAppSlice } from "../slice";

export const addToBlockchainSlice = createAppSlice(
  "blockchain",
  initState.payload.blockchain,
);

export default addToBlockchainSlice.reducer;
